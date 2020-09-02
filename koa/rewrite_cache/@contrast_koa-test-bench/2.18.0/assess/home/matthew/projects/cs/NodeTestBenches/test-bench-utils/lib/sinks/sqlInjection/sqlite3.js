var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const sqlite3 = require("sqlite3");
    const {SQL} = require("sql-template-strings");

    const db = new sqlite3.Database(":memory:");

    [
        "all",
        "run",
        "get",
        "each",
        "exec",
        "prepare"
    ].forEach(func => {
        /**
   * @param {Object} params
   * @param {string} params.input user input string
   * @param {Object} opts
   * @param {boolean=} opts.safe are we calling the sink safely?
   * @param {boolean=} opts.noop are we calling the sink as a noop?
   */
        module.exports[ContrastMethods.__contrastTag`sqlite3.${ func }`] = async function sink({input}, {safe = false, noop = false} = {}) {
            if (noop) {
                return "NOOP";
            }

            const sql = safe ? SQL`SELECT ${ input } as "test"`.sql : ContrastMethods.__contrastTag`SELECT "${ input }" as "test";`;

            db[ContrastMethods.__forceCopy(func)](sql, (err, result) => {
            });
            return encodeURIComponent(sql);
        };
    });

}.apply(this, arguments));