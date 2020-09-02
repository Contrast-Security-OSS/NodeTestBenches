var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const hooker = require("hooker");
    const mysql = require("mysql");
    const {SQL} = require("sql-template-strings");
    const escape = require("escape-html");

    // Prevent the query method from requiring a real database connection.
    hooker.hook(require("mysql\/lib\/Connection").prototype, "query", {
        post(result, sql, cb) {
            cb(null, { query: sql });
        }
    });

    const conn = mysql.createConnection({
        host: "localhost",
        user: "root"
    });
    conn._connectCalled = true;
    conn.connect();

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports = async function mysqlQuery({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const sql = safe ? SQL`SELECT ${ input } as "test"` : ContrastMethods.__contrastTag`SELECT "${ input }" as "test";`;

        return new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                if (err)
                    return reject(err);
                return resolve(escape(JSON.stringify(result)));
            });
        });
    };

}.apply(this, arguments));