'use strict';

/**
 * @param {string} xssString
 * @param {boolean=} safe
 */
module.exports.reflectedXss = function reflectedXss(xssString, safe = false) {
  const responseBody = safe ? encodeURIComponent(xssString) : xssString;

  return `<html>${responseBody}</html>`;
};
