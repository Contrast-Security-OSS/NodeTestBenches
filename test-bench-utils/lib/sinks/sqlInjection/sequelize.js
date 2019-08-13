'use strict';

const Sequelize = require('sequelize');
const { SQL } = require('sql-template-strings');

const sequelize = new Sequelize('postgres://root@localhost:5432/db');

const origQuery = Sequelize.prototype.query;
Sequelize.prototype.query = function overloadedQuery(sql, opts) {
  // run the original query asynchronously, ignoring any errors it will throw.
  origQuery.call(this, sql, opts).catch((err) => {});
  return Promise.resolve({ query: sql });
};

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports = async function sequelizeQuery(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const sql = safe
    ? SQL`SELECT ${input} as "test"`
    : `SELECT "${input}" as "test";`;

  return sequelize.query(sql);
};
