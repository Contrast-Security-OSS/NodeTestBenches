var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const xpath = require("xpath");
    const {DOMParser} = require("xmldom");
    const {xml} = require("..\/content\/xpathInjection");
    const doc = new DOMParser().parseFromString(xml);

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["xpath.select"] = async function select({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const path = safe ? encodeURIComponent(input) : input;

        return new Promise(resolve => {
            const searchString = ContrastMethods.__contrastTag`//user[username/text()='${ path }']`;
            const user = xpath.select(searchString, doc).toString();
            resolve(user);
        });
    };

}.apply(this, arguments));