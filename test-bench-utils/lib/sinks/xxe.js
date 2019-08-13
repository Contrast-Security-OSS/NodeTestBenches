'use strict';
const libxmljs = require('libxmljs');

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['libxmljs.parseXmlString'] = function parseXmlString(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const result = libxmljs.parseXmlString(input, { noent: !safe });
  return `<pre>${result}</pre>`;
};
