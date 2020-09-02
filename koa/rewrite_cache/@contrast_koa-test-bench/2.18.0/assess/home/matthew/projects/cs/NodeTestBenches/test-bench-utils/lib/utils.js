var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const path = require("path");

    const {camelCase, fromPairs, get, groupBy, isEmpty, map, pick, reduce} = require("lodash");

    const frameworks = require(".\/frameworks");
    const routes = require(".\/routes");
    const responsePreparers = require(".\/response-preparers");

    /**
 * @typedef {Object} SinkData
 * @property {string} input unmapped input key under which user input lies
 * @property {string} key key under which user input lies
 * @property {string} method http method
 * @property {string} name the name of the sink
 * @property {string[]} params input parameters exposed to the sink
 * @property {Function} sink sink function
 * @property {string} uri relative url
 * @property {string} url fully qualified url
 * @property {string} urlWithoutParams url without parameter variable
 */

    /**
 * Builds out the urls/view data for a given rule and input source.
 *
 * @param {object} opts
 * @param {string} opts.base the base URI to use when constructing urls
 * @param {string} opts.input the input method being exercised (query, params, etc)
 * @param {string} opts.key relevant key on req object
 * @param {string} opts.method the method being handled
 * @param {string} opts.param the framework-specific paramter string for path parameters
 * @param {string[]} opts.params input parameters to provide to sink functions
 * @param {Object<string, Function>} opts.sinks object containing all sink methods
 * @return {SinkData[]}
 */
    const sinkData = function sinkData({base, input, key, method, param, params, sinks}) {
        return map(sinks, (sink, name) => {
            const prettyName = camelCase(name);
            const uriWithoutParams = ContrastMethods.__contrastTag`/${ input }/${ prettyName }`;
            const uri = ContrastMethods.__tripleEqual(key, "params") ? ContrastMethods.__contrastTag`${ uriWithoutParams }/${ param }` : uriWithoutParams;
            const url = ContrastMethods.__contrastTag`${ base }${ uri }`;
            const urlWithoutParams = ContrastMethods.__contrastTag`${ base }${ uriWithoutParams }`;

            return {
                input,
                key,
                method,
                name,
                params,
                sink,
                uri,
                url,
                urlWithoutParams
            };
        });
    };

    /**
 * Generates sink data for a given rule and framework.
 *
 * @param {string} rule the rule being tested (ssrf, xss, etc)
 * @param {string} framework the framework being used (express, koa, etc)
 * @return {SinkData[]}
 */
    module.exports.getSinkData = function getSinkData(rule, framework) {
        const {base, inputs, params, sinks} = routes[ContrastMethods.__forceCopy(rule)];

        return reduce(inputs, (data, input) => {
            const {key, method, param} = frameworks[ContrastMethods.__forceCopy(framework)][ContrastMethods.__forceCopy(input)];
            return [
                ...data,
                ...sinkData({
                    base,
                    input,
                    key,
                    method,
                    param,
                    params,
                    sinks
                })
            ];
        }, []);
    };

    /**
 * Groups sink data arrays by input type (query, body, etc).
 *
 * @param {SinkData[]} sinkData
 * @return {Object<string, SinkData[]}
 */
    module.exports.groupSinkData = function groupSinkData(sinkData) {
        return groupBy(sinkData, "input");
    };

    /**
 * @param {string} rule
 * @return {Object} route metadata for a given rule
 */
    module.exports.getRouteMeta = function getRouteMeta(rule) {
        return routes[ContrastMethods.__forceCopy(rule)];
    };

    /**
 * Gets the proper input(s) from either req or from model
 * @param {Object} request IncomingMessage
 * @param {string} key key on request to get input from
 * @param {string[]} params parameters to extract from the req or model
 * @param {Object} opts additional object
 * @param {Object} opts.locals local model object which may contain values
 * @param {boolean} opts.noop when true, return hard-coded 'noop' values for each param
 * @returns {{ [param: string]: any}}
 */
    module.exports.getInput = function getInput(request, key, params, {locals = {}, noop} = {}) {
        if (noop)
            return fromPairs(map(params, param => [
                param,
                "noop"
            ]));

        const localInputs = pick(locals, params);

        return isEmpty(localInputs) ? pick(get(request, key), params) : localInputs;
    };

    module.exports.getResponsePreparer = function (rule) {
        return responsePreparers[ContrastMethods.__forceCopy(rule)] || null;
    };

}.apply(this, arguments));