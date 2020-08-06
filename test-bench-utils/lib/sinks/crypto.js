'use strict';
const crypto = require('crypto');

/**
 * @param {string} _input not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['crypto-bad-mac'] = async function exec(
  _input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const algorithm = safe ? 'sha512' : 'md5';

  return crypto.createHash(algorithm)
    .update('salt')
    .digest('hex');
};

/**
 * @param {string} _input not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['crypto-bad-ciphers'] = async function exec(
  _input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const { algorithm, bytes } = safe ? { algorithm: 'aes-256-cbc', bytes: 16 } : { algorithm: 'rc2', bytes: 8 };

  const key = Buffer.alloc(32);
  const iv = Buffer.alloc(bytes);
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  cipher.update('woot', 'utf8', 'base64')
  return cipher.final('base64');
};


/**
 * @param {string} _input not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['crypto-weak-randomness'] = async function exec(
  _input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';
  return safe ? crypto.randomBytes(10).toString('hex') : Math.random(10).toString();
};


