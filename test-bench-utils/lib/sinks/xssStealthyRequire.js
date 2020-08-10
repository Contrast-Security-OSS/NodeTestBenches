'use strict';

const stealthyRequire = require('stealthy-require');

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
exports.reflectedXss = async function reflectedXssWithStealthyRequire(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const escapeHtml = stealthyRequire(require.cache, () =>
    require('escape-html')
  );
  const responseBody = safe ? escapeHtml(input) : input;

  return `<html>${responseBody}</html>`;
};
