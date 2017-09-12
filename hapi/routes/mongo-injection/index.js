'use strict';
const pluginName = 'hapitestbench-mongoinjection';
let db;

/**
 * @param {string} type Name of the property of request to get the input from
 * @param {boolean} safe Whether or not to make the route safe
 */
function baseHandler (type, safe, request, reply) {
	if (!db) { reply(new Error('mongo db not properly initialized')); }
	const input = safe ? '' : request[type].input;
	db.eval('db.hapitestbench.find(' + input  + ')', function(err, result) {
		if (err) {
			reply(err.toString());
		} else {
			reply(result);
		}
	});
}

function makeHandler (type, safe) {
	return baseHandler.bind(this, type, safe);
}

// curl http://localhost:3000/mongoinjection/header --header "input: hi_header"
// curl http://localhost:3000/mongoinjection/headerSafe --header "input: hi_header"
// curl http://localhost:3000/mongoinjection/cookie --cookie "input=hi_cookie"
// curl http://localhost:3000/mongoinjection/cookieSafe --cookie "input=hi_cookie"
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

exports.register = function mongoInjection(server, options, next) {
	db = server.plugins['hapitestbench-mongo'].db;

	server.route([
		{
			method: 'GET',
			path: '/',
			handler: {
				view: 'mongo-injection'
			}
		},
		{method: 'GET',  path: '/query',             handler: handlers.query},
		{method: 'GET',  path: '/querySafe',         handler: handlers.querySafe},
		{method: 'GET',  path: '/param/{input}',     handler: handlers.query},
		{method: 'GET',  path: '/paramSafe/{input}', handler: handlers.querySafe},
		{method: 'POST', path: '/post',              handler: handlers.post},
		{method: 'POST', path: '/postSafe',          handler: handlers.postSafe},
		{method: 'GET',  path: '/header',            handler: handlers.header},
		{method: 'GET',  path: '/headerSafe',        handler: handlers.headerSafe},
		{method: 'GET',  path: '/cookie',            handler: handlers.cookie},
		{method: 'GET',  path: '/cookieSafe',        handler: handlers.cookieSafe}
	]);

	next();
};

exports.register.attributes = {
	name: pluginName
};
