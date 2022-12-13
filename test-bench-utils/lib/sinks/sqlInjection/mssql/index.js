'use strict';

const sql = require('mssql');
const config = require('./config');

const initDb = async () => {
  const pool = await sql.connect(config);

  await pool.query`IF EXISTS (SELECT name FROM sys.tables WHERE name='Students') DROP TABLE Students;`;
  await pool.query`IF NOT EXISTS (SELECT name FROM sys.tables WHERE name='Students') CREATE TABLE Students (id INT PRIMARY KEY, name varchar(255));`;

  return pool;
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mssql.PreparedStatement.prototype.prepare'] = async function mssqlQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) {
    return 'NOOP';
  }

  const pool = await initDb();
  const ps = new sql.PreparedStatement(pool);

  if (safe) {
    await ps.input('param', sql.NVarChar(sql.MAX));
    await ps.prepare('SELECT * FROM Students WHERE name = @param');
    return ps.execute({ param: input });
  } else {
    await ps.prepare(`SELECT * FROM Students WHERE name = '${input}'`);
    return ps.execute();
  }
};


/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mssql.Request.prototype.batch'] = async function mssqlQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) {
    return 'NOOP';
  }

  const pool = await initDb();

  if (safe) {
    return pool.batch`CREATE PROCEDURE #temp AS SELECT * FROM Students WHERE name = '${input}'`;
  } else {
    return pool.batch(`CREATE PROCEDURE #temp AS SELECT * FROM Students WHERE name = '${input}'`);
  }
};


/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mssql.Request.prototype.query'] = async function mssqlQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) {
    return 'NOOP';
  }

  const pool = await initDb();

  if (safe) {
    return pool.query`SELECT * FROM Students WHERE name = '${input}'`;
  } else {
    return pool.query(`SELECT * FROM Students WHERE name = '${input}'`);
  }
};
