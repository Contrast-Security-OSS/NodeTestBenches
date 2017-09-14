'use strict';

/**
 * @param {string} type Name of the property of request to get the input from
 * @param {boolean} safe Whether or not to make the route safe
 */
function baseHandler (type, safe, request, reply) {
	const input = safe ? encodeURIComponent(request[type].input)
		: request[type].input;

	const output = '<html>' + encodeURIComponent(input) + '</html>';
	reply(output);
}

function makeHandler (type, safe) {
	return baseHandler.bind(this, type, safe);
}

exports.register = function reflectedXss(server, options, next) {

	// curl http://localhost:3000/reflectedxss/header --header "input: hi_header"
	// curl http://localhost:3000/reflectedxss/headerSafe --header "input: hi_header"
	// curl http://localhost:3000/reflectedxss/cookie --cookie "input=hi_cookie"
	// curl http://localhost:3000/reflectedxss/cookieSafe --cookie "input=hi_cookie"
	const handlers = {
		query:      makeHandler('query', false),
		querySafe:  makeHandler('query', true),
		param:      makeHandler('params', false),
		paramSafe:  makeHandler('params', true),
		header:     makeHandler('headers', false),
		headerSafe: makeHandler('headers', true),
		cookie:     makeHandler('state', false),
		cookieSafe: makeHandler('state', true),
		post:       makeHandler('payload', false),
		postSafe:   makeHandler('payload', true)
	};

	server.route([
		{
			method: 'GET',
			path: '/',
			handler: {
				view: 'reflected-xss'
			}
		},
		{method: 'GET',  path: '/cookie',            handler: handlers.cookie},
		{method: 'GET',  path: '/cookieSafe',        handler: handlers.cookieSafe},
		{method: 'GET',  path: '/header',            handler: handlers.header},
		{method: 'GET',  path: '/headerSafe',        handler: handlers.headerSafe},
		{method: 'GET',  path: '/param/{input}',     handler: handlers.query},
		{method: 'GET',  path: '/paramSafe/{input}', handler: handlers.querySafe},
		{method: 'GET',  path: '/query',             handler: handlers.query},
		{method: 'GET',  path: '/querySafe',         handler: handlers.querySafe},
		{method: 'POST', path: '/post',              handler: handlers.post},
		{method: 'POST', path: '/postSafe',          handler: handlers.postSafe},
	]);

	next();
};

exports.register.attributes = {
	name: 'hapitestbench-reflectedxss'
};
