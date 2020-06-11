'use strict';

const sqlite3 = require('sqlite3');
const { SQL } = require('sql-template-strings');

const db = new sqlite3.Database(':memory:');

['all', 'run', 'get', 'each', 'exec', 'prepare'].forEach((func) => {
  module.exports[`sqlite3.${func}`] = async function sink(
    input,
    { safe = false, noop = false } = {}
  ) {
    if (noop) {
      return 'NOOP';
    }

    const sql = safe
      ? SQL`SELECT ${input} as "test"`.sql
      : `SELECT "${input}" as "test";`;

    db[func](sql, (err, result) => {});
    return encodeURIComponent(sql);
  };
});
