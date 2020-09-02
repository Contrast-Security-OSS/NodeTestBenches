var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const Sequelize = require("sequelize");
    const {SQL} = require("sql-template-strings");

    const sequelize = new Sequelize("postgres:\/\/root@localhost:5432\/db");
    const escape = require("escape-html");

    const origQuery = Sequelize.prototype.query;
    Sequelize.prototype.query = async function overloadedQuery(sql, opts) {
        // run the original query asynchronously, ignoring any errors it will throw since we aren't connected.
        origQuery.call(this, sql, opts).catch(err => {
        });
        return { query: sql };
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports = async function sequelizeQuery({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const sql = safe ? SQL`SELECT ${ input } as "test"` : ContrastMethods.__contrastTag`SELECT "${ input }" as "test";`;

        return sequelize.query(sql).then(result => escape(JSON.stringify(result)));
    };

}.apply(this, arguments));