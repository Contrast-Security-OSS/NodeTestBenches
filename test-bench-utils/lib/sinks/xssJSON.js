'use strict';

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.reflectedXssJSON = async function reflectedXssJSON(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return {};

  return { input: safe ? encodeURIComponent(input) : input };
};
