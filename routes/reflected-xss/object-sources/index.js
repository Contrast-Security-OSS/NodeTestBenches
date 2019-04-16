/**
 * The purpose of this class is to test propagation with object sources,
 * including serialization and toStringing
 */
'use strict';

/**
 * @param {string} type Name of the property of request to get the input from
 * @param {boolean} safe Whether or not to make the route safe
 */
function baseHandler (type, safe, request, h) {
	const input = request[type];

	let output;
	if (safe) {
		// this will produce something like <html>[object Object]</html>
		output = '<html>' + input + '</html>';
	} else {
		output = '<html>' + JSON.stringify(input) + '</html>';
	}
	return output;
}

function makeHandler (type, safe) {
	return baseHandler.bind(this, type, safe);
}

exports.register = function reflectedXss(server, options) {

	// curl http://localhost:3000/reflectedxss/objects/header --header "input: hi_header"
	// curl http://localhost:3000/reflectedxss/objects/headerSafe --header "input: hi_header"
	// curl http://localhost:3000/reflectedxss/objects/cookie --cookie "input=hi_cookie"
	// curl http://localhost:3000/reflectedxss/objects/cookieSafe --cookie "input=hi_cookie"
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
		// {
		// 	method: 'GET',
		// 	path: '/',
		// 	handler: {
		// 		view: 'reflected-xss'
		// 	}
		// },
		{method: 'GET',  path: '/cookie',            handler: handlers.cookie},
		{method: 'GET',  path: '/cookieSafe',        handler: handlers.cookieSafe},
		{method: 'GET',  path: '/header',            handler: handlers.header},
		{method: 'GET',  path: '/headerSafe',        handler: handlers.headerSafe},
		{method: 'GET',  path: '/param/{input}',     handler: handlers.param},
		{method: 'GET',  path: '/paramSafe/{input}', handler: handlers.paramSafe},
		{method: 'GET',  path: '/query',             handler: handlers.query},
		{method: 'GET',  path: '/querySafe',         handler: handlers.querySafe},
		{method: 'POST', path: '/post',              handler: handlers.post},
		{method: 'POST', path: '/postSafe',          handler: handlers.postSafe},
	]);
};

exports.name = 'hapitestbench.reflectedxss.objects';
