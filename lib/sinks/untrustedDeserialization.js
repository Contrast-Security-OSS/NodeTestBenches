'use strict';
const { serialize, unserialize } = require('node-serialize');

module.exports.untrustedDeserialization = async function(
  input,
  { safe = false, noop = false }
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return new Promise((resolve) => {
    const serialized = serialize(resolve);
    const parsed = unserialize(serialized);
    resolve(parsed);
  });
};
