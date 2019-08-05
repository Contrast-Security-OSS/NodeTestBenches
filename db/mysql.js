'use strict';
const util = require('util');
const mysql = require('mysql');
const hooker = require('hooker');

// mock the sql query so the app does not require a database connection
hooker.hook(require('mysql/lib/Connection').prototype, 'query', {
  pre() {},
  post(result, sql, cb) {
    cb(null, [
      {
        query: sql
      }
    ]);
  }
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root'
});

// pretend we already connected
connection._connectCalled = true;

exports.register = function mongo(server, options) {
  connection.connect();
  connection.query = util.promisify(connection.query);
	console.log('connected to mysql server'); // eslint-disable-line
  return server.expose('db', connection);
};

exports.name = 'hapitestbench.mysql';
