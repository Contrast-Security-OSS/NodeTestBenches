var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const pg = require("pg");
    const hooker = require("hooker");
    const escape = require("escape-html");

    const client = new pg.Client({ connectionString: "localhost" });

    // Prevent the query method from requiring a real database connection.
    hooker.hook(client, "query", {
        post(result, config, values) {
            // catch the original rejection
            result.catch(err => console.log(err));
            // return a new promise that just resolves
            return hooker.override(new Promise((resolve, reject) => {
                // escape it so it isn't reported as an XSS
                resolve(escape(JSON.stringify(config)));
            }));
        }
    });

    module.exports = client;

}.apply(this, arguments));