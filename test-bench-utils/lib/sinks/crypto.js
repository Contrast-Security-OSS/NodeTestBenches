'use strict';

const crypto = require('crypto');

/**
 * @param {Object} _inputs not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['crypto-bad-mac'] = async function exec(
  _inputs,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const algorithm = safe ? 'sha512' : 'md5';

  return crypto
    .createHash(algorithm)
    .update('salt')
    .digest('hex');
};

/**
 * @param {Object} _inputs not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['crypto-bad-ciphers'] = async function exec(
  _inputs,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const { algorithm, bytes, key_length } = safe
    ? { algorithm: 'aes-256-cbc', bytes: 16, key_length: 32 }
    : { algorithm: 'camellia-128-cbc', bytes: 16, key_length: 16 };

  const key = Buffer.alloc(key_length);
  const iv = Buffer.alloc(bytes);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  cipher.update('woot', 'utf8', 'base64');
  return cipher.final('base64');
};

/**
 * @param {Object} _inputs not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['crypto-weak-randomness'] = async function exec(
  _inputs,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';
  return safe
    ? crypto.randomBytes(10).toString('hex')
    : Math.random(10).toString();
};
