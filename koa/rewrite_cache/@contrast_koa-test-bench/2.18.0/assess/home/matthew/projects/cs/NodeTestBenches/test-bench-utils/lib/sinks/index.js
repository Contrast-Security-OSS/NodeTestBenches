var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    module.exports = {
        cmdInjection: require(".\/cmdInjection"),
        cmdInjectionSemanticChainedCommands: require(".\/cmdInjectionSemanticChainedCommands"),
        cmdInjectionSemanticDangerousPaths: require(".\/cmdInjectionSemanticDangerousPaths"),
        crypto: require(".\/crypto"),
        nosqlInjection: require(".\/nosqlInjection"),
        pathTraversal: require(".\/pathTraversal"),
        sqlInjection: require(".\/sqlInjection"),
        ssjs: require(".\/ssjs"),
        ssrf: require(".\/ssrf"),
        unsafeFileUpload: require(".\/unsafeFileUpload"),
        untrustedDeserialization: require(".\/untrustedDeserialization"),
        unvalidatedRedirect: require(".\/unvalidatedRedirect"),
        xpathInjection: require(".\/xpathInjection"),
        xss: require(".\/xss"),
        xssStealthyRequire: require(".\/xssStealthyRequire"),
        xssJSON: require(".\/xssJSON"),
        xxe: require(".\/xxe")
    };

}.apply(this, arguments));