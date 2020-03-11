'use strict';
const { unserialize } = require('node-serialize');

const pre = (str) => `<pre>${str}</pre>`;

module.exports.untrustedDeserialization = async function(
  input,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const result = unserialize(input);
  return pre(result);
};
