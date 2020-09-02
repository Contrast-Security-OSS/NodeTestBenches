var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const sharedMapping = {
        query: {
            method: "get",
            key: "query"
        },
        params: {
            method: "get",
            key: "params",
            param: ":input"
        },
        headers: {
            method: "get",
            key: "headers"
        },
        body: {
            method: "post",
            key: "body"
        },
        cookies: {
            method: "post",
            key: "cookies"
        },
        input: { method: "get" }
    };

    module.exports = {
        restify: sharedMapping,
        express: sharedMapping,
        kraken: sharedMapping,
        loopback: sharedMapping,
        koa: {
            ...sharedMapping,
            body: {
                method: "post",
                key: "request.body"
            },
            cookies: {
                method: "post",
                key: "cookie"
            }
        },
        hapi: {
            ...sharedMapping,
            params: {
                method: "get",
                key: "params",
                param: "{input}"
            },
            body: {
                method: "post",
                key: "payload"
            },
            cookies: {
                method: "post",
                key: "state"
            }
        }
    };

}.apply(this, arguments));