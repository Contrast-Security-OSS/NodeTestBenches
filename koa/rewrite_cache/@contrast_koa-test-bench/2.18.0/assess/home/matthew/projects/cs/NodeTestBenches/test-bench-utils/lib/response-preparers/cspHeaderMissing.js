var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const cspHeaders = [
        "content-security-policy",
        "x-content-security-policy",
        "x-webkit-csp"
    ];

    module.exports = function (res) {
        cspHeaders.forEach(header => {
            res.removeHeader(header);
        });
    };

}.apply(this, arguments));