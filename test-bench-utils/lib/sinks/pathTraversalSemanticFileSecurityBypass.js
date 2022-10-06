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
 module.exports['fs.readFile'] = async function readFileSync(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const vector = input === 'type1' ? '/etc/passwd' : 'c:\\textfile.txt::$DATA'
  const path = safe ? '/safe/path' : vector;

  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      const result = err
        ? errMsg('readFile', err.message, safe)
        : pre(data.toString());

      resolve(result);
    });
  });
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
 module.exports['fs.readFileSync'] = async function readFileSync(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const vector = input === 'type1' ? '/etc/passwd' : 'c:\\textfile.txt::$DATA'
  const path = safe ? '/safe/path' : vector;

    const result = fs.readFileSync(path).toString();
    return pre(result);
};

/**
 * @param {Object} _inputs not used but need to keep signature for abstracted helpers
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['child_process.exec'] = async function exec(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const vector = input === 'type1' ? '/etc/passwd' : 'c:\\textfile.txt::$DATA'

  return new Promise((resolve) => {
    cp.exec(vector, (err, data) => {
      let result = data;
      if (err) {
        result = `exec failed on ${vector}, err: ${err.message}`
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
 module.exports['child_process.execSync'] = async function exec(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const vector = input === 'type1' ? '/etc/passwd' : 'c:\\textfile.txt::$DATA'

  return pre(cp.execSync(vector).toString());
};
