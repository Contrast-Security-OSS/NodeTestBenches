'use strict';

const Hoek = require('hoek');
const fs = require('fs');

const pluginName = 'hapitestbench.pathtraversal';

exports.register = function pathTraversal ( server, options, next ) {

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
							try { reply((handle(value) || '').toString()); }
							catch (error) { reply(error.message); }
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

	const content = 'EXPLOITED';
	const sinks = {
		fs: {
			mkdir     : ( input, cb ) => fs.mkdir(input, cb),
			readdir   : ( input, cb ) => fs.readdir(input, cb),
			readFile  : ( input, cb ) => fs.readFile(input, cb),
			readlink  : ( input, cb ) => fs.readlink(input, cb),
			writeFile : ( input, cb ) => fs.writeFile(input, content, cb),

			mkdirSync     : input => fs.mkdirSync(input),
			readdirSync   : input => fs.readdirSync(input),
			readFileSync  : input => fs.readFileSync(input),
			readlinkSync  : input => fs.readlinkSync(input),
			writeFileSync : input => fs.writeFileSync(input, content)
		}
	};

	[
		['/read-dir'       , sinks.fs.readdir      ],
		['/read-file'      , sinks.fs.readFile     ],
		['/read-link'      , sinks.fs.readlink     ],
		['/write-file'     , sinks.fs.writeFile    ],
		['/read-dir-sync'  , sinks.fs.readdirSync  ],
		['/read-file-sync' , sinks.fs.readFileSync ],
		['/read-link-sync' , sinks.fs.readlinkSync ],
		['/write-file-sync', sinks.fs.writeFileSync]
	].forEach(
		confArgs => makeRouteHandlers.apply(null, confArgs));



	next();
};

exports.register.attributes = { name: pluginName };
