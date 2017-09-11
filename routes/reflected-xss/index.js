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
		const output = '<html><img src=\'' + encodeURIComponent(input) + '\'/></html>';
		reply(output);
	},
	unsafe: (request, reply) => {
		const input = request.params.input;
		const output = '<html><img src=\'' + input + '\'/></html>';
		reply(output);
	}
};

const post = {
	safe: (request, reply) => {
		const input = request.payload.input;
		const output = '<html>' + encodeURIComponent(input) + '</html>';
		reply(output);
	},
	unsafe: (request, reply) => {
		const input = request.payload.input;
		const output = '<html>' + input + '</html>';
		reply(output);
	}
};

// curl http://localhost:3000/reflectedxss/header --header "input: hi_header"
// curl http://localhost:3000/reflectedxss/headerSafe --header "input: hi_header"
const header = {
	safe: (request, reply) => {
		const input = request.headers.input;
		const output = '<html>' + encodeURIComponent(input) + '</html>';
		reply(output);
	},
	unsafe: (request, reply) => {
		const input = request.headers.input;
		const output = '<html>' + input + '</html>';
		reply(output);
	}
};

// curl http://localhost:3000/reflectedxss/cookie --cookie "input=hi_cookie"
// curl http://localhost:3000/reflectedxss/cookieSafe --cookie "input=hi_cookie"
const cookie = {
	safe: (request, reply) => {
		const input = request.state.input;
		const output = '<html>' + encodeURIComponent(input) + '</html>';
		reply(output);
	},
	unsafe: (request, reply) => {
		const input = request.state.input;
		const output = '<html>' + input + '</html>';
		reply(output);
	}
};

exports.register = function reflectedXss(server, options, next) {
	server.route([
		{
			method: 'GET',
			path: '/',
			handler: {
				view: 'reflected-xss'
			}
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
		},

		{
			method: 'POST',
			path: '/post',
			handler: post.unsafe
		},
		{
			method: 'POST',
			path: '/postSafe',
			handler: post.safe
		},

		{
			method: 'GET',
			path: '/header',
			handler: header.unsafe
		},
		{
			method: 'GET',
			path: '/headerSafe',
			handler: header.safe
		},

		{
			method: 'GET',
			path: '/cookie',
			handler: cookie.unsafe
		},
		{
			method: 'GET',
			path: '/cookieSafe',
			handler: cookie.safe
		}
	]);

	next();
};

exports.register.attributes = {
	name: 'hapitestbench-reflectedxss'
};
