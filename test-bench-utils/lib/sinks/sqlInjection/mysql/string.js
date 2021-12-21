'use strict';

const con = require('./config');
const { SQL } = require('sql-template-strings');

const initDb = new Promise((resolve, reject) => {
  if (con.state === 'disconnected') {
    con.connect(function(err) {
      if (err) {
        console.log('MySQL DB Initial Connection Error', err);
        reject();
      }
      resolve();
    });
  }
});

const resetDb = new Promise((resolve, reject) => {
  con.query('DROP TABLE IF EXISTS Students', function(err, result) {
    if (err) console.log('MySQL DB Error', err);
    con.query('CREATE TABLE IF NOT EXISTS Students (id INT)', (err, result) => {
      resolve(result);
    });
  });
});

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports = async function mysqlQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) {
    return 'NOOP';
  }

  const sql = safe ? SQL`SELECT ${input} as "test"` : `${input}`;

  await initDb;
  await resetDb;

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        console.log('Error executing MySQL DB Query', err);
        reject();
      }
      return resolve(escape(JSON.stringify(result)));
    });
  });
};
