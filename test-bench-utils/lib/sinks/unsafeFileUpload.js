'use strict';
/**
 * This sink only exists to generate sinkData, the actual implementation is unique
 * in each framework.
 */

/**
 * @param {Object} params
 * @param {string} params.input user input string
 */
module.exports.upload = async function upload({ input }) {
  return input;
};
