'use strict';
// require('reflect-metadata')
const { Connection, Repository } = require('typeorm');
const { SQL } = require('sql-template-strings');
const escape = require('escape-html');
const repo = new Repository();
repo.manager = new Connection({ type: 'mysql', isConnected: true });
repo.manager.query = (sql) => Promise.resolve({ query: sql });
module.exports['typeorm.Repository.prototype.query'] = async function repoQuery(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';
  const sql = safe
    ? SQL`SELECT ${input} as "test"`
    : `SELECT "${input}" as "test";`;
  return repo.query(sql).then((result) => escape(JSON.stringify(result)));
};
const conn = new Connection({ type: 'mysql', isConnected: true });
module.exports[
  'typeorm.Connection.prototype.query'
] = async function connectionQuery(input, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';
  const sql = safe
    ? SQL`SELECT ${input} as "test"`
    : `SELECT "${input}" as "test";`;
  return conn
    .query(
      sql,
      {},
      {
        query() {
          return { query: sql };
        }
      }
    )
    .then((result) => escape(JSON.stringify(result)));
};
