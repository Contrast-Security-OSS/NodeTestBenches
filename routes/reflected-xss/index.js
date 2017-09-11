'use strict';

const querystring = {
	safe: (request, reply) => {
		const input = request.query.input;
		const output = '<html>' + encodeURIComponent(input) + '</html>';
		reply(output);
	},
	unsafe: (request, reply) => {
		const input = request.query.input;
		const output = '<html>' + input + '</html>';
		reply(output);
	}
};

const pathparam = {
	safe: (request, reply) => {
		const input = request.params.input;
		const output = '<html>' + encodeURIComponent(input) + '</html>';
		reply(output);
	},
	unsafe: (request, reply) => {
		const input = request.params.input;
		const output = '<html>' + input + '</html>';
		reply(output);
	}
};

exports.register = function reflectedXss(server, options, next) {
	server.route([
		{
			method: 'GET',
			path: '/',
			handler: function(request, reply) { /* TODO */ }
		},

		{
			method: 'GET',
			path: '/query',
			handler: querystring.unsafe
		},
		{
			method: 'GET',
			path: '/querySafe',
			handler: querystring.safe
		},

		{
			method: 'GET',
			path: '/param/{input}',
			handler: pathparam.unsafe
		},
		{
			method: 'GET',
			path: '/paramSafe/{input}',
			handler: pathparam.safe
		}
	]);

	next();
};

exports.register.attributes = {
	name: 'hapitestbench-reflectedxss'
};
