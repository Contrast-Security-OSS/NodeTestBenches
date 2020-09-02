var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    module.exports = {
        cacheControlsMissing: require(".\/cacheControlsMissing"),
        clickjackingControlsMissing: require(".\/clickjackingControlsMissing"),
        cspHeaderInsecure: require(".\/cspHeaderInsecure"),
        cspHeaderMissing: require(".\/cspHeaderMissing"),
        hstsHeaderMissing: require(".\/hstsHeaderMissing"),
        xContentTypeHeaderMissing: require(".\/xContentTypeHeaderMissing"),
        xssProtectionHeaderDisabled: require(".\/xssProtectionHeaderDisabled")
    };

}.apply(this, arguments));