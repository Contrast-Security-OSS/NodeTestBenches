'use strict';
const vm = require('vm');

/**
 * eval tests the CODE_STRING sink type
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.eval = async function _eval(
  input,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return eval(input);
};

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.Function = async function _Function(
  input,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  return Function(`return ${input};`)();
};

/**
 * runInNewContext tests CODE_ENV sink type
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['vm.runInNewContext'] = async function _runInNewContext(
  input,
  { safe = false, noop = false } = {}
) {
  if (safe) return 'SAFE';
  if (noop) return 'NOOP';

  const sandbox = { value: '', process };
  vm.runInNewContext(`value = ${input}`, sandbox);
  return sandbox.value;
};
