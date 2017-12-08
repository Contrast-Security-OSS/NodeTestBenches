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

						console.log(dataPath);
						console.log(request.payload);
						console.log(value);

						/* For synchronous methods */
						if (handle.length == 1) {
							reply((value || '').toString());
						}

						/* For asynchronous methods */
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
		vm: {
			readdir   : ( input, cb ) => fs.readdir(input, cb),
			readFile  : ( input, cb ) => fs.readFile(input, cb),
			readlink  : ( input, cb ) => fs.readlink(input, cb),
			writeFile : ( input, cb ) => fs.writeFile(input, cb),

			readdirSync   : input => fs.readdirSync(input),
			readFileSync  : input => fs.readFileSync(input),
			readlinkSync  : input => fs.readlinkSync(input),
			writeFileSync : input => fs.writeFileSync(input)
		}
	};

	[
		['/read-dir'       , sinks.vm.readdir      ],
		['/read-file'      , sinks.vm.readFile     ],
		['/read-link'      , sinks.vm.readlink     ],
		['/write-file'     , sinks.vm.writeFile    ],
		['/read-dir-sync'  , sinks.vm.readdirSync  ],
		['/read-file-sync' , sinks.vm.readFileSync ],
		['/read-link-sync' , sinks.vm.readlinkSync ],
		['/write-file-sync', sinks.vm.writeFileSync]
	].forEach(
		confArgs => makeRouteHandlers.apply(null, confArgs));



	next();
};

exports.register.attributes = { name: pluginName };
