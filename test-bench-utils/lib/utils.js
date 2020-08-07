'use strict';
const { camelCase, groupBy, map, reduce, get } = require('lodash');

const frameworks = require('./frameworks');
const routes = require('./routes');

/**
 * @typedef {Object} SinkData
 * @property {string} input unmapped input key under which user input lies
 * @property {string} key key under which user input lies
 * @property {string} method http method
 * @property {string} name the name of the sink
 * @property {string} uri relative url
 * @property {string} url fully qualified url
 * @property {string} urlWithoutParams url without parameter variable
 * @property {string|Function} sink name of the function/sink OR the sink itself
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
 * @param {Object<string, Function>} opts.sinks
 * @return {SinkData[]}
 */
function sinkData({ base, input, key, method, param, sinks }) {
  return map(sinks, (sink, name) => {
    const prettyName = camelCase(name);
    const uriWithoutParams = `/${input}/${prettyName}`;
    const uri =
      key === 'params' ? `${uriWithoutParams}/${param}` : uriWithoutParams;
    const url = `${base}${uri}`;
    const urlWithoutParams = `${base}${uriWithoutParams}`;

    return {
      input,
      key,
      method,
      name,
      sink,
      uri,
      url,
      urlWithoutParams
    };
  });
}

/**
 * Generates sink data for a given rule and framework.
 *
 * @param {string} rule the rule being tested (ssrf, xss, etc)
 * @param {string} framework the framework being used (express, koa, etc)
 * @return {SinkData[]}
 */
module.exports.getSinkData = function getSinkData(rule, framework) {
  const { base, inputs, sinks } = routes[rule];

  return reduce(
    inputs,
    (data, input) => {
      const { key, method, param } = frameworks[framework][input];
      return [
        ...data,
        ...sinkData({
          base,
          input,
          key,
          method,
          param,
          sinks
        })
      ];
    },
    []
  );
};

/**
 * Groups sink data arrays by input type (query, body, etc).
 *
 * @param {SinkData[]} sinkData
 * @return {Object<string, SinkData[]}
 */
module.exports.groupSinkData = function groupSinkData(sinkData) {
  return groupBy(sinkData, 'input');
};

/**
 * @param {string} rule
 * @return {Object} route metadata for a given rule
 */
module.exports.getRouteMeta = function getRouteMeta(rule) {
  return routes[rule];
};

/**
 * Gets the proper input from either req or from model
 * @param {Object} params
 * @param {Object} params.locals local model object
 * @param {Object} params.req IncomingMessage
 * @param {string} params.key key on request to get input from
 */
module.exports.getInput = function getInput({ locals, req, key }) {
  return locals.input || get(req, key).input;
};

/**
 * Gets value of part from request.
 * Note: This is currently only used in ssrf to indicate which part of a URL
 * to affect
 *
 * @param {Object} params
 * @param {Object} params.req IncomingMessage
 * @param {string} params.key key on request to get input from
 *
 */
module.exports.getPart = function({ req, key }) {
  return get(req, key).part;
};
