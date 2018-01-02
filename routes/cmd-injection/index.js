'use strict';

const cp = require('child_process');
const Hoek = require('hoek');

const pluginName = 'hapitestbench.cmdinjection';

exports.register = function cmdInjection ( server, options, next ) {

	/* ########################################################### */
	/* ### Base index HTML page                                ### */
	/* ########################################################### */
	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: 'cmd-injection'
		}
	});

	/* ########################################################### */
	/* ### Build API routes programmatically                  #### */
	/* ########################################################### */

	const methods = ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'PUT', 'POST'];
	const inputTypes = ['query', 'params', 'headers', 'state', 'payload'];
	const inputSegmentLookup = {
		payload : '/body',
		headers : '/headers',
		params  : '/url-params',
		query   : '/query',
		state   : '/cookies'
	};

	const makeRouteHandlers = ( sinkSegment, handle ) => {
		inputTypes.forEach(type => {

			const dataPath = `${type}.input`;
			const inputSegment = inputSegmentLookup[type];

			server.route(
				[{
					path    : `${inputSegment}/safe${sinkSegment}`,
					method  : methods,
					handler : ( _, reply ) => reply('SAFE')
				}, {
					path    : `${inputSegment}/unsafe${sinkSegment}`,
					method  : methods,
					handler : ( request, reply ) => {

						const value = Hoek.reach(request, dataPath);

						/* For synchronous sink methods:  */
						if (handle.length == 1) {
							reply((handle(value) || '').toString());
						}

						/* For asynchronous sink methods: */
						else {
							handle(value || '', ( error, data ) => {
								reply((error || data || '').toString());
							});
						}

					}
				}]);
		});
	};

	const sinks = {
		cp: {
			exec: ( input, cb ) => cp.exec(input, cb),
			execSync: input => cp.execSync(input)
		}
	};

	[
		['/exec'     , sinks.cp.exec    ],
		['/exec-sync', sinks.cp.execSync]
	].forEach(
		confArgs => makeRouteHandlers.apply(null, confArgs));

	next();
};

exports.register.attributes = { name: pluginName };
