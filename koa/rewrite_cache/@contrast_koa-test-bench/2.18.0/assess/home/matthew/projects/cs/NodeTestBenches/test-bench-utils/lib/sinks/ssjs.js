var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const vm = require("vm");

    /**
 * eval tests the CODE_STRING sink type
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports.eval = async function _eval({input}, {safe = false, noop = false} = {}) {
        if (safe)
            return "SAFE";
        if (noop)
            return "NOOP";

        const result = eval(ContrastMethods.__contrastEval(input));
        return ContrastMethods.__tripleEqual(typeof result, "function") ? input : result;
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports.Function = async function _Function({input}, {safe = false, noop = false} = {}) {
        if (safe)
            return "SAFE";
        if (noop)
            return "NOOP";

        const result = Function(ContrastMethods.__contrastTag`return ${ input };`)();
        return ContrastMethods.__tripleEqual(typeof result, "function") ? input : result;
    };

    /**
 * runInNewContext tests CODE_ENV sink type
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["vm.runInNewContext"] = async function _runInNewContext({input}, {safe = false, noop = false} = {}) {
        if (safe)
            return "SAFE";
        if (noop)
            return "NOOP";

        const sandbox = {
            value: "",
            process
        };
        vm.runInNewContext(ContrastMethods.__contrastTag`value = ${ input }`, sandbox);
        return ContrastMethods.__tripleEqual(typeof sandbox.value, "function") ? input : sandbox.value;
    };

}.apply(this, arguments));