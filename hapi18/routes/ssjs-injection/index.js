'use strict';

const Hoek = require('@hapi/hoek');
const vm = require('vm');

exports.name = 'hapitestbench.ssjsinjection';

exports.register = function ssjsInjection(server, options) {

	/* ########################################################### */
	/* ### Base index HTML page                                ### */
	/* ########################################################### */
	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: 'ssjs-injection'
		}
	});

	/* ########################################################### */
	/* ### Build API routes programmatically                  #### */
	/* ########################################################### */

	/*  Routes:                                                    */
	/*  /ssjs-injection/query/[un]safe/eval                  ,     */
	/*  /ssjs-injection/query/[un]safe/function              ,     */
	/*  /ssjs-injection/query/[un]safe/vm-create-context     ,     */
	/*  /ssjs-injection/query/[un]safe/vm-run-in-context     ,     */
	/*  /ssjs-injection/query/[un]safe/vm-run-in-new-context , ... */

	const methods = ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'PUT', 'POST'];
	const inputTypes = ['query', 'params', 'headers', 'state', 'payload'];
	const inputSegmentLookup = {
		payload: '/body',
		headers: '/headers',
		params: '/url-params',
		query: '/query',
		state: '/cookies'
	};

	const makeRouteHandlers = (sinkSegment, handle) => {
		inputTypes.forEach(type => {

			const dataPath = `${type}.input`;
			const inputSegment = inputSegmentLookup[type];

			server.route(
				[{
					path: `${inputSegment}/safe${sinkSegment}`,
					method: methods,
					handler: (request, h) => {
						const value = handle('"Safe and trusted"') || '';
						return value.toString();
					}
				}, {
					path: `${inputSegment}/unsafe${sinkSegment}`,
					method: methods,
					handler: (request, h) => {
						const value = handle(Hoek.reach(request, dataPath)) || '';
						return value.toString();
					}
				}]);
		});
	};

	const _eval = input => {
		return eval(input.toString());
	};

	const _Function = input => {
		return Function(input)();
	};

	const vmRunInCtx = input => {
		const sb  = {value: '', process};
		const ctx = vm.createContext(sb);

		vm.runInContext(`value = ${input};`, ctx);

		return sb.value;
	};

	const vmRunInNewCtx = input => {
		const sb = {value: '', process};
		vm.runInNewContext(`value = ${input};`, sb);

		return sb.value;
	};

	const vmRunInThisCtx = input => {
		const epoch = new Date().getTime();
		const name = `value${epoch}`;

		global[name] = '';

		vm.runInThisContext(`${name} = ${input};`);
		setTimeout(() => { delete global[name]; }, 1000);

		return global[name];
	};

	const vmCreateContext = input => {
		throw new Error('Not implemented.');
	};

	const vmScriptRunInCtx = input => {
		const sb = {value: '', process};
		const ctx = vm.createContext(sb);
		const script = new vm.Script(`value = ${input};`);
		script.runInContext(ctx);

		return sb.value;
	};

	const vmScriptRunInNewCtx = input => {
		const sb = {value: '', process};
		const script = new vm.Script(`value = ${input};`);
		script.runInNewContext(sb);

		return sb.value;
	};

	const vmScriptRunInThisCtx = input => {
		const epoch = new Date().getTime();
		const name = `value${epoch}`;

		global[name] = '';

		const script = new vm.Script(`${name} = ${input};`);
		script.runInThisContext();
		setTimeout(() => { delete global[name]; }, 1000);

		return global[name];
	};

	[
		['/eval'                         , _eval],
		['/function'                     , _Function],
		['/vm-run-in-context'            , vmRunInCtx],
		['/vm-run-in-new-context'        , vmRunInNewCtx],
		['/vm-run-in-this-context'       , vmRunInThisCtx],
		['/vm-create-context'            , vmCreateContext],
		['/vm-script-run-in-context'     , vmScriptRunInCtx],
		['/vm-script-run-in-new-context' , vmScriptRunInNewCtx],
		['/vm-script-run-in-this-context', vmScriptRunInThisCtx]
	].forEach(
		confArgs => makeRouteHandlers.apply(null, confArgs));
};
