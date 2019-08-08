'use strict';

const hooker = require('hooker');
const mysql = require('mysql');

// Prevent the query method from requiring a real database connection.
hooker.hook(require('mysql/lib/Connection').prototype, 'query', {
  post(result, sql, cb) {
    cb(null, { query: sql });
  }
});

const conn = mysql.createConnection({ host: 'localhost', user: 'root' });
conn._connectCalled = true;
conn.connect();

module.exports.query = function mysqlQuery(input) {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT "${input}" as "test";`, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
