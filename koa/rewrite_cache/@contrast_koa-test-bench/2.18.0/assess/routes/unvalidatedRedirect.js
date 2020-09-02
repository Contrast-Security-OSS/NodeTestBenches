var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const controllerFactory = require("..\/utils\/controllerFactory");

    /**
 * @vulnerability: unvalidated-redirect
 */
    module.exports = controllerFactory("unvalidatedRedirect", {
        locals: { res: "ctx" },
        respond(result, ctx) {
            if (result.status) {
                ctx.status = 301;
            }

            ctx.redirect(result.path);
        }
    });

}.apply(this, arguments));