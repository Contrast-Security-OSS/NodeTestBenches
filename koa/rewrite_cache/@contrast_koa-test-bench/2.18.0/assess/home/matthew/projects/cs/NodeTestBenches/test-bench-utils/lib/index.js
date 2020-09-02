var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const {map, pick} = require("lodash");

    const routes = require(".\/routes");

    const navRoutes = map(routes, route => pick(route, [
        "base",
        "name",
        "products"
    ]));

    module.exports = {
        content: require(".\/content"),
        navRoutes,
        routes,
        utils: require(".\/utils")
    };

}.apply(this, arguments));