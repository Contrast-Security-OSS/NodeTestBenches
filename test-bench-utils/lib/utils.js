'use strict';

const {
  camelCase,
  get,
  groupBy,
  isEmpty,
  map,
  pick,
  reduce
} = require('lodash');

const frameworks = require('./frameworks');
const routes = require('./routes');

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
const sinkData = function sinkData({
  base,
  input,
  key,
  method,
  param,
  params,
  sinks
}) {
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
  const { base, inputs, params, sinks } = routes[rule];

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
          params,
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
 * Gets the proper input(s) from either req or from model
 * @param {Object} opts
 * @param {Object=} opts.locals local model object
 * @param {string[]} opts.params parameters to extract from the req or model
 * @param {Object} opts.req IncomingMessage
 * @param {string} opts.key key on request to get input from
 * @returns {{ [param: string]: any}}
 */
module.exports.getInput = function getInput({ locals = {}, params, req, key }) {
  const localInputs = pick(locals, params);

  return isEmpty(localInputs) ? pick(get(req, key), params) : localInputs;
};
