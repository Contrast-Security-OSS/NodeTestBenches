var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    const dynamodb = require(".\/dynamodb");
    const mongodb = require(".\/mongodb");
    const rethinkdb = require(".\/rethinkdb");

    module.exports = {
        ...dynamodb,
        ...mongodb,
        ...rethinkdb
    };

}.apply(this, arguments));