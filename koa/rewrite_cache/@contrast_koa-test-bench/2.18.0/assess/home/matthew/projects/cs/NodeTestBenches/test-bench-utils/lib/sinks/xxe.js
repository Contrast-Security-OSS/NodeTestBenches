var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const libxmljs = require("libxmljs");
    const libxmljs2 = require("libxmljs2");

    const pre = str => ContrastMethods.__contrastTag`<pre>${ str }</pre>`;

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["libxmljs.parseXmlString"] = async function parseXmlString({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const result = libxmljs.parseXmlString(input, { noent: !safe });
        return pre(result);
    };

    module.exports["libxmljs2.parseXml"] = async function parseXml({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const result = libxmljs2.parseXml(input, { noent: !safe });
        return pre(result);
    };

}.apply(this, arguments));