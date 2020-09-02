var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const fs = require("fs");

    const errMsg = (method, msg, safe) => safe ? ContrastMethods.__contrastTag`Congrats, you are safe! Error from ${ method }: ${ msg }` : ContrastMethods.__contrastTag`Done!`;
    const pre = str => ContrastMethods.__contrastTag`<pre>${ str }</pre>`;

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["fs.readFile"] = async function readFile({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const path = safe ? encodeURIComponent(input) : input;

        return new Promise(resolve => {
            fs.readFile(path, (err, data) => {
                const result = err ? errMsg("readFile", err.message, safe) : pre(data.toString());

                resolve(result);
            });
        });
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["fs.readFileSync"] = async function readFileSync({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const path = safe ? encodeURIComponent(input) : input;

        try {
            const result = fs.readFileSync(path).toString();
            return pre(result);
        } catch (err) {
            // properly throw error from protect
            if (ContrastMethods.__tripleEqual(err.type, "contrast")) {
                throw err;
            }
            return pre(errMsg("readFileSync", err.message, safe));
        }
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["fs.writeFile"] = async function writeFile({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const path = safe ? encodeURIComponent(input) : input;

        return new Promise(resolve => {
            fs.writeFile(path, "stuff", (err, data) => {
                const result = err ? errMsg("readFile", err.message, safe) : ContrastMethods.__contrastTag`Wrote to ${ path }`;

                resolve(result);
            });
        });
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["fs.writeFileSync"] = async function writeFileSync({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const path = safe ? encodeURIComponent(input) : input;

        try {
            fs.writeFileSync(path, "stuff");
            return ContrastMethods.__contrastTag`Wrote to ${ path }`;
        } catch (err) {
            // properly throw error from protect
            if (ContrastMethods.__tripleEqual(err.type, "contrast")) {
                throw err;
            }
            return pre(errMsg("writeFileSync", err.message, safe));
        }
    };

}.apply(this, arguments));