var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const controllerFactory = require("..\/utils\/controllerFactory");

    /**
 * @vulnerability: cmd-injection-semantic-dangerous-paths
 */
    module.exports = controllerFactory("cmdInjectionSemanticDangerousPaths");

}.apply(this, arguments));