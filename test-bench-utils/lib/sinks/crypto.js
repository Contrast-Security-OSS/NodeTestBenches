'use strict';
const crypto = require('crypto');

/**
 * @param {string} not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['crypto-bad-mac'] = async function exec(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const algorithm = safe ? 'sha512' : 'md5';

  return new Promise((resolve) => {
    const hash = crypto.createHash(algorithm);
    hash.update('salt');
    const value = hash.digest('hex');
    resolve(value);
  });
};

/**
 * @param {string} not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['crypto-bad-ciphers'] = async function exec(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const { algorithm, bytes } = safe ? { algorithm: 'aes-256-cbc', bytes: 16 } : { algorithm: 'rc2', bytes: 8 };

  return new Promise((resolve) => {
    const key = Buffer.alloc(32);
    const iv = Buffer.alloc(bytes);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.update('woot', 'utf8', 'base64');
    const value = cipher.final('base64');
    resolve(value);
  });
};


/**
 * @param {string} not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['crypto-weak-randomness'] = async function exec(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';
  const method = safe ? crypto.randomBytes(10).toString('hex') : Math.random(10).toString();

  return new Promise((resolve) => {
    resolve(method);
  });
};


