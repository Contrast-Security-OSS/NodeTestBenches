'use strict';
const mysql = require('mysql');
const hooker = require('hooker');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root'
});

// mock the sql query so the app does not require a database connection
hooker.hook(require('mysql/lib/Connection').prototype, 'query', {
	pre: function() {},
	post: function(result, sql, cb) {
		cb(null, [{
			query: sql
		}]);
	}
});

// pretend we already connected
connection._connectCalled = true;

exports.register = function mongo(server, options, next) {
	connection.connect();
	console.log('connected to mysql server'); // eslint-disable-line
	server.expose('db', connection);
	next();
};

exports.register.attributes = {
	name: 'hapitestbench.mysql'
};
