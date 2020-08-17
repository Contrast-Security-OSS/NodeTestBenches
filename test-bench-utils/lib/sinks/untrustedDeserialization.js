'use strict';

const { unserialize } = require('node-serialize');

const pre = (str) => `<pre>${str}</pre>`;

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.untrustedDeserialization = async function deserialize(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const result = unserialize(input);
  return pre(result);
};
