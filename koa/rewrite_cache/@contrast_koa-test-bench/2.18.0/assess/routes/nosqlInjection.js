var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const {content} = require("@contrast\/test-bench-utils");
    const controllerFactory = require("..\/utils\/controllerFactory");

    /**
 * @vulnerability: nosql-injection
 * @vulnerability: nosql-injection-mongo
 */
    module.exports = controllerFactory("nosqlInjection", { locals: { attackValues: content.nosqlInjection } });

}.apply(this, arguments));