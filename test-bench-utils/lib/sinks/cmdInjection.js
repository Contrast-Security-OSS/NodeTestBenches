'use strict';

const cp = require('child_process');

const pre = (str) => `<pre>${str}</pre>`;

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['child_process.exec'] = async function exec(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';
  if (!input) input = "";
  return new Promise((resolve) => {
    cp.exec(input, (err, data) => {
      if (err) {
        console.log(`exec failed on ${input}, err: ${err.message}`);
      }
      resolve(pre(data.toString()));
    });
  });
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['child_process.execSync'] = async function execSync(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return pre(cp.execSync(input).toString());
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['child_process.spawn'] = async function spawn(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return new Promise((resolve) => {
    const [cmd, ...args] = input.split(' ');

    const command = cp.spawn(cmd, args);
    command.on('error', (err) => {
      console.log(`spawn failed on ${cmd}, err: ${err.message}`);
    });
    command.stdout.on('data', (data) => {
      resolve(pre(data.toString()));
    });
  });
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['child_process.spawnSync'] = async function spawn(
  { input },
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const [cmd, ...args] = input.split(' ');
  return pre(cp.spawnSync(cmd, args).stdout.toString());
};
