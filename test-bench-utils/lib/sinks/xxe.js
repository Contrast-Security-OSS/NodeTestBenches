'use strict';
let libxmljs;
try {
  libxmljs = require('libxmljs');
} catch (err) {
  /* swallow errors */
}
const libxmljs2 = require('libxmljs2');

const pre = (str) => `<pre>${str}</pre>`;

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['libxmljs.parseXmlString'] = async function parseXmlString(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  // Documented failure for Express on Node-14 alpine
  // See NODE-1062: https://contrast.atlassian.net/browse/NODE-1062
  if (!libxmljs) return '';

  const result = libxmljs.parseXmlString(input, { noent: !safe });
  return pre(result);
};

module.exports['libxmljs2.parseXml'] = async function parseXml(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const result = libxmljs2.parseXml(input, { noent: !safe });
  return pre(result);
};
