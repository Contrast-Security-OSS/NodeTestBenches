var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    /**
 * This sink only exists to generate sinkData, the actual implementation is unique
 * in each framework.
 */

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 */
    module.exports.upload = async function upload({input}) {
        return input;
    };

}.apply(this, arguments));