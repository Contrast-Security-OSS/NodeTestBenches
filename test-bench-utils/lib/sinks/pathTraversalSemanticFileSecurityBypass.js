'use strict';

const cp = require('child_process');
const fs = require('fs');

const errMsg = (method, msg, safe) =>
  safe ? `Congrats, you are safe! Error from ${method}: ${msg}` : `Done!`;
const pre = (str) => `<pre>${str}</pre>`;

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
 module.exports['fs.readFileSync (type I)'] = async function readFileSync(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const path = safe ? '/safe/path' : '/etc/passwd';

  try {
    const result = fs.readFileSync(path).toString();
    return pre(result);
  } catch (err) {
    // properly throw error from protect
    if (err.type === 'contrast') {
      throw err;
    }
    return pre(errMsg('readFileSync', err.message, safe));
  }
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
 module.exports['fs.readFileSync (type II)'] = async function readFileSync(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const path = safe ? '/safe/path' : 'c:\\textfile.txt::$DATA';

  try {
    const result = fs.readFileSync(path).toString();
    return pre(result);
  } catch (err) {
    // properly throw error from protect
    if (err.type === 'contrast') {
      throw err;
    }
    return pre(errMsg('readFileSync', err.message, safe));
  }
};

/**
 * @param {Object} _inputs not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['child_process.exec (type I)'] = async function exec(
  _inputs,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return new Promise((resolve) => {
    cp.exec('/etc/passwd', (err, data) => {
      let result = data;
      if (err) {
        result = `exec failed on '/etc/passwd', err: ${err.message}`
      }
      resolve(pre(result.toString()));
    });
  });
};

/**
 * @param {Object} _inputs not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
 module.exports['child_process.exec (type II)'] = async function exec(
  _inputs,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return new Promise((resolve) => {
    cp.exec('c:\\textfile.txt::$DATA', (err, data) => {
      let result = data
      if (err) {
        result = `exec failed on 'c:\\textfile.txt::$DATA', err: ${err.message}`;
      }
      resolve(pre(result.toString()));
    });
  });
};
