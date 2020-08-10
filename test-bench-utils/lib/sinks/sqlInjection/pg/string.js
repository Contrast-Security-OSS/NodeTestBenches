'use strict';

const client = require('./client');

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports = async function pgQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) {
    return 'NOOP';
  }
  if (safe) {
    return client.query('SELECT $1::text as message', [input]);
  } else {
    return client.query(`SELECT ${input} as message`);
  }
};
