var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const unsafePolicy = [
        "default-src 'none'",
        "font-src *",
        "img-src *",
        "media-src *",
        "script-src *",
        "style-src 'unsafe-inline' *"
    ].join("; ");

    module.exports = function (res) {
        res.setHeader("Content-Security-Policy", unsafePolicy);
        return res;
    };

}.apply(this, arguments));