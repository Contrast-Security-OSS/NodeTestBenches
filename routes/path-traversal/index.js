'use strict';

const Hoek = require('@hapi/hoek');
const util = require('util');

const fs = require('fs');
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const readlink = util.promisify(fs.readlink);
const writeFile = util.promisify(fs.writeFile);

exports.name  = 'hapitestbench.pathtraversal';

exports.register = function pathTraversal(server, options) {

	/* ########################################################### */
	/* ### Base index HTML page                                ### */
	/* ########################################################### */
	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: 'path-traversal'
		}
	});

	/* ########################################################### */
	/* ### Build API routes programmatically                  #### */
	/* ########################################################### */

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
					handler: (request, h) => 'SAFE'
				}, {
					path: `${inputSegment}/unsafe${sinkSegment}`,
					method: methods,
					handler: async (request, h) => {
						const value = Hoek.reach(request, dataPath) || '';
						const result = await handle(value);
						return result.toString();
					}
				}]);
		});
	};

	const content = 'EXPLOITED';
	const sinks = {
		fs: {
			mkdir: (input, cb) =>     mkdir(input, cb),
			readdir: (input, cb) =>   readdir(input, cb),
			readFile: (input, cb) =>  readFile(input, cb),
			readlink: (input, cb) =>  readlink(input, cb),
			writeFile: (input, cb) => writeFile(input, content, cb),

			mkdirSync: input => fs.mkdirSync(input),
			readdirSync: input => fs.readdirSync(input),
			readFileSync: input => fs.readFileSync(input),
			readlinkSync: input => fs.readlinkSync(input),
			writeFileSync: input => fs.writeFileSync(input, content)
		}
	};

	[
		['/read-dir'       , sinks.fs.readdir],
		['/read-file'      , sinks.fs.readFile],
		['/read-link'      , sinks.fs.readlink],
		['/write-file'     , sinks.fs.writeFile],
		['/read-dir-sync'  , sinks.fs.readdirSync],
		['/read-file-sync' , sinks.fs.readFileSync],
		['/read-link-sync' , sinks.fs.readlinkSync],
		['/write-file-sync', sinks.fs.writeFileSync]
	].forEach(
		confArgs => makeRouteHandlers.apply(null, confArgs));
};
