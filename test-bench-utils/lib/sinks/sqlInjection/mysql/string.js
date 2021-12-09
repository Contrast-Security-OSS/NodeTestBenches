'use strict';

const config = require('./config');
const mysql = require('mysql2/promise');
const { SQL } = require('sql-template-strings');
let conn;

const initDb = async () => {
  try {
    if (!conn || !conn.state === 'disconnected') {
      conn = await mysql.createConnection(config);
    }

    await conn.query('DROP TABLE IF EXISTS students');
    await conn.query('CREATE TABLE IF NOT EXISTS students (id INT)');

  } catch (err) {
    console.log('MySQL DB Initial Connection Error', err);
    conn = { query() { return null }};
  }
};

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
  try {
    await initDb();

    if (noop) {
      return 'NOOP';
    }

    const sql = safe
      ? SQL`SELECT ${input} as "test"`
      : `SELECT "${input}" as "test";`;

    const result = await conn.query(sql);
    return escape(JSON.stringify(result));
  } catch (err) {
    console.log('Error executing MySQL DB Query', err);
  }
};
