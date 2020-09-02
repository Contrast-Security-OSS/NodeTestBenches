var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    // require('reflect-metadata')
    const {Connection, Repository} = require("typeorm");
    const {SQL} = require("sql-template-strings");
    const escape = require("escape-html");
    const repo = new Repository();
    repo.manager = new Connection({
        type: "mysql",
        isConnected: true
    });
    repo.manager.query = sql => Promise.resolve({ query: sql });
    const conn = new Connection({
        type: "mysql",
        isConnected: true
    });

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["typeorm.Repository.prototype.query"] = async function repoQuery({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";
        const sql = safe ? SQL`SELECT ${ input } as "test"` : ContrastMethods.__contrastTag`SELECT "${ input }" as "test";`;
        return repo.query(sql).then(result => escape(JSON.stringify(result)));
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["typeorm.Connection.prototype.query"] = async function connectionQuery({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";
        const sql = safe ? SQL`SELECT ${ input } as "test"` : ContrastMethods.__contrastTag`SELECT "${ input }" as "test";`;
        return conn.query(sql, {}, {
            query() {
                return { query: sql };
            }
        }).then(result => escape(JSON.stringify(result)));
    };

}.apply(this, arguments));