'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});
server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
});

server.route({
	method: 'GET',
	path: '/quit',
	handler: function(req, reply) {
		reply('adieu, cherie').on('finish', () => process.exit()); // eslint-disable-line
	}
});
