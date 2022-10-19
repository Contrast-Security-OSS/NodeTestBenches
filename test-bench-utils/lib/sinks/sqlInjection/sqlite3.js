'use strict';

// const sqlite3 = require('sqlite3');
// const { SQL } = require('sql-template-strings');

// const db = new sqlite3.Database('db.sqlite3');

['all', 'run', 'get', 'each', 'exec', 'prepare'].forEach((func) => {
  /**
   * @param {Object} params
   * @param {string} params.input user input string
   * @param {Object} opts
   * @param {boolean} [opts.safe] are we calling the sink safely?
   * @param {boolean} [opts.noop] are we calling the sink as a noop?
   */
  module.exports[`sqlite3.${func}`] = async function sink(
    { input },
    { safe = false, noop = false } = {}
  ) {
    if (noop) {
      return 'NOOP';
    }

    return 'NOOP';
    // const sql = safe
    //   ? SQL`SELECT ${input} as "test"`.sql
    //   : `SELECT "${input}" as "test";`;

    // db[func](sql, (err, result) => {});
  };
});
