'use strict';

/**
 * @param {string} input attack vector
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.reflectedXss = function reflectedXss(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const responseBody = safe ? encodeURIComponent(input) : input;

  return `<html>${responseBody}</html>`;
};
