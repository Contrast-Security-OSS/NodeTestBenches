'use strict';

const con = require('./config');
const { SQL } = require('sql-template-strings');

const initDb = new Promise((resolve, reject) => {
  if (con.state === 'disconnected') {
    con.connect(function(err) {
      if (err) reject('MySQL Initial Connection Error');
      resolve();
    });
  } else {
    resolve();
  }
}).catch((e) => {
  console.log('[INFO] Could not connect to MySQL. Proceeding without MySQL DB');
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

  // InitDB
  await initDb;

  // resetDB
  await new Promise((resolve, reject) => {
    // These queries have to reject because it could fail because the db is already dropped or existent and we don't really care
    con.query('DROP TABLE IF EXISTS Students', function(err, _result) {
      if (err) reject('MySQL: Could not drop table');
      con.query(
        'CREATE TABLE IF NOT EXISTS Students (id INT)',
        (err, result) => {
          if (err) reject('MySQL: Could not create table');
          resolve(result);
        }
      );
    });
  }).catch(console.log);

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject('Error executing MySQL DB Query');
      }

      return resolve(escape(JSON.stringify(result)));
    });
  });
};
