'use strict';

const sql = require('mssql');
const config = require('./config');

const initDb = async () => {
  const pool = await sql.connect(config);

  await pool.query`IF EXISTS (SELECT name FROM sys.tables WHERE name='Students') DROP TABLE Students;`;
  await pool.query`IF NOT EXISTS (SELECT name FROM sys.tables WHERE name='Students') CREATE TABLE Students (id INT);`;

  return pool;
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports = async function mssqlQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) {
    return 'NOOP';
  }

  const pool = await initDb();

  if (safe) {
    return pool.query`SELECT * FROM Students WHERE name = ${input}`;
  } else {
    return pool.query(`SELECT * FROM Students WHERE name = ${input}`);
  }
};
