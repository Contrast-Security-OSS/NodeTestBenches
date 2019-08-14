'use strict';

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['redirect(path)'] = async function redirect(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return { path: 'http://www.example.com' };

  const path = safe ? encodeURIComponent(input) : input;

  return { path };
};

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['redirect(status, path)'] = async function redirect(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return { path: 'http://www.example.com' };

  const path = safe ? encodeURIComponent(input) : input;

  return { status: true, path };
};
