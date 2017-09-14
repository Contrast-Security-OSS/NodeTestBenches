'use strict';

exports.register = (server, options, next) => {
	server.route([{
		method: 'GET',
		path: '/',
		handler: {
			view: 'index'
		}
	},
	{
		method: 'GET',
		path: '/public/app.css',
		handler: function(request, reply) {
			reply.file('public/app.css');
		}
	},
	{
		method: 'GET',
		path: '/quit',
		handler: (r, reply) => {
			reply('adieu, cherie').on('finish', () => process.exit()); // eslint-disable-line
		}
	}]);

	next();
};

exports.register.attributes = {
	pkg: require('../package.json')
};
