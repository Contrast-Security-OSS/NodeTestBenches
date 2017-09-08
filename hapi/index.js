'use strict';
/* eslint-disable */

const Hapi = require('hapi');
const server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: __dirname
			}
		}
	}
});

server.connection({port: 3000, host: 'localhost'});
server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
});

server.register(require('inert'), err => {
	server.route({
		method: 'GET',
		path: '/public/app.css',
		handler: function(request, reply) {
			reply.file('public/app.css');
		}
	});
	// method: 'GET',
	// path: 'public/app.css',
	// handler: function() {
	// }
});
server.register(require('vision'), err => {
	server.views({
		engines: {
			ejs: require('ejs')
		},
		relativeTo: __dirname,
		path: 'views',
		partialsPath: 'views/partials'
	});
});

server.route({
	method: 'GET',
	path: '/',
	handler: {
		view: 'pages/index'
	}
	// handler: function(req, reply) {
	// 	reply('');
	// }
});

server.route({
	method: 'GET',
	path: '/quit',
	handler: function(req, reply) {
		reply('adieu, cherie').on('finish', () => process.exit()); // eslint-disable-line
	}
});
