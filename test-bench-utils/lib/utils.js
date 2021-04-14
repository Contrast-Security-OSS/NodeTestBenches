'use strict';

const {
  camelCase,
  flatMap,
  fromPairs,
  get,
  groupBy,
  isEmpty,
  map,
  pick,
  reduce
} = require('lodash');

const content = require('./content');
const frameworks = require('./frameworks');
const routes = require('./routes');
const responsePreparers = require('./response-preparers');

/** @typedef {import("http").IncomingMessage} IncomingMessage */
/** @typedef {import("./routes").Route} Route */
/** @typedef {import("./response-preparers").ResponsePreparer} ResponsePreparer */
/** @typedef {import("./sinks").Sink} Sink */
/** @typedef {import("./sinks").SinkParams} SinkParams */

/**
 * @typedef {Object} SinkData
 * @property {string} input unmapped input key under which user input lies
 * @property {string} key key under which user input lies
 * @property {string} method http method
 * @property {string} name the name of the sink
 * @property {string[]} params input parameters exposed to the sink
 * @property {string} safety pattern we're calling the sink, i.e. safe or unsafe
 * @property {Sink} sink sink function
 * @property {string} uri relative url
 * @property {string} url fully qualified url
 * @property {string} urlWithoutParams url without parameter variable
 */

/**
 * Builds out the urls/view data for a given rule and input source.
 *
 * @param {Object} opts
 * @param {string} opts.base the base URI to use when constructing urls
 * @param {string} opts.input the input method being exercised (query, params, etc)
 * @param {string} opts.key relevant key on req object
 * @param {string} opts.method the method being handled
 * @param {string} opts.param the framework-specific paramter string for path parameters
 * @param {string[]} opts.params input parameters to provide to sink functions
 * @param {{ [name: string]: Sink }} opts.sinks object containing all sink methods
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
  return flatMap(sinks, (sink, name) => {
    let sinkObj = sink;

    if (typeof sink === 'function') {
      sinkObj = {
        safe: (args) => sink(args, { safe: true }),
        unsafe: (args) => sink(args),
        noop: (args) => sink(args, { noop: true })
      };
    }

    return map(sinkObj, (sink, safety) => {
      const prettyName = camelCase(name);
      const uriWithoutParams = `/${input}/${prettyName}`;
      const uriWithoutSafety =
        key === 'params' ? `${uriWithoutParams}/${param}` : uriWithoutParams;
      const uri = `${uriWithoutSafety}/${safety}`;
      const url = `${base}${uri}`;
      const urlWithoutParams = `${base}${uriWithoutParams}`;

      return {
        input,
        key,
        method,
        name,
        params,
        safety,
        sink,
        uri,
        url,
        urlWithoutParams
      };
    });
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
 * @return {{[input: string]: SinkData[]}}
 */
module.exports.groupSinkData = function groupSinkData(sinkData) {
  return groupBy(sinkData, 'input');
};

/**
 * Returns the `content` included for a given rule.
 * @param {string} rule
 * @return {string}
 */
module.exports.getContent = function getContent(rule) {
  return content[rule];
};

/**
 * Return all configured rules with defined routes.
 * @return {string[]}
 */
module.exports.getAllRules = function getRoutes() {
  return Object.keys(routes);
};

/**
 * @param {string} rule
 * @return {Route} route metadata for a given rule
 */
module.exports.getRouteMeta = function getRouteMeta(rule) {
  return routes[rule];
};

/**
 * Gets the proper input(s) from either req or from model
 * @param {IncomingMessage} request IncomingMessage
 * @param {string} key key on request to get input from
 * @param {string[]} params parameters to extract from the req or model
 * @param {Object} opts additional object
 * @param {Object} opts.locals local model object which may contain values
 * @param {boolean} opts.noop when true, return hard-coded 'noop' values for each param
 * @returns {SinkParams}
 */
module.exports.getInput = function getInput(
  request,
  key,
  params,
  { locals = {}, noop } = {}
) {
  if (noop) return fromPairs(map(params, (param) => [param, 'noop']));

  const localInputs = pick(locals, params);

  return isEmpty(localInputs) ? pick(get(request, key), params) : localInputs;
};

/**
 * Returns the Response preparing function for a given rule
 * @param {string} rule
 * @returns {ResponsePreparer|null}
 */
module.exports.getResponsePreparer = function(rule) {
  return responsePreparers[rule] || null;
};
