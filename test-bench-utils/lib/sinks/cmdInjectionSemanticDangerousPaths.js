'use strict';
const cp = require('child_process');

const pre = (str) => `<pre>${str}</pre>`;

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['child_process.exec'] = async function exec(
  input,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return new Promise((resolve) => {
    cp.exec("/bin/sh -c 'cat /tmp/foo.txt /etc/passwd'", (err, data) => {
      if (err) {
        console.log(
          `exec failed on /bin/sh -c 'cat /tmp/foo.txt /etc/passwd', err: ${err.message}`
        );
      }
      resolve(pre(data.toString()));
    });
  });
};
