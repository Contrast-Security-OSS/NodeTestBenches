'use strict';
const { serialize, unserialize } = require('node-serialize');

const pre = (str) => `<pre>${str}</pre>`;

module.exports.untrustedDeserialization = async function(
  input,
  { safe = false, noop = false }
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const serialized = serialize(input);
  const parsed = unserialize(serialized);
  return pre(parsed);
};
