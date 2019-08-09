'use strict';

const { groupBy, kebabCase, map, reduce } = require('lodash');

const MAPPING = require('./frameworkMapping');
const routes = require('./routes');

/**
 * @typedef {Object} SinkData
 * @property {string} url fully qualified url
 * @property {string} uri relative url
 * @property {string} key key under which user input lies
 * @property {string} method http method
 * @property {string|Function} sink name of the function/sink OR the sink itself
 * @property {string=} sinkName the name of the sink when it is a function
 * @property {string=} code string representation of code being executed by sink (for views)
 * @property {string=} lib library being exercised as a sync (for views)
 */

/**
 * Builds out the urls/view data for a given rule and input source.
 *
 * @param {object} opts
 * @param {string[]|Object[]|Object<string, Function>} opts.sinks
 * @param {string} opts.key relevant key on req object
 * @param {string} opts.baseUri the base URI to use when constructing urls
 * @param {string} opts.method the method being handled
 * @return {SinkData[]}
 */
function sinkData({ sinks, key, baseUri, method }) {
  return map(sinks, (sink, sinkName) => {
    const { code, lib } = sink;
    // Use function if object otherwise use string value
    // This is done after the code and lib
    sink = sink.function || sink;
    return {
      url: `${baseUri}/${key}/${kebabCase(sinkName)}`,
      uri: `/${key}/${kebabCase(sinkName)}`, // hapi uses relative urls
      key,
      method,
      sinkName,
      sink,
      code,
      lib
    };
  });
}

module.exports.buildUrls = sinkData;

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
      const { method, key } = MAPPING[framework][input];
      return [...data, ...sinkData({ sinks, key, baseUri: base, method })];
    },
    []
  );
};

module.exports.getViewData = module.exports.getSinkData;

/**
 * Groups sink data arrays by input type (query, body, etc).
 *
 * @param {SinkData[]} sinkData
 * @return {Object<string, SinkData[]}
 */
module.exports.groupSinkData = function groupSinkData(sinkData) {
  return groupBy(sinkData, 'key');
};

module.exports.attackXml = `
<!DOCTYPE read-fs [<!ELEMENT read-fs ANY >
<!ENTITY passwd SYSTEM "file:///etc/passwd" >]>
<users>
  <user>
    <read-fs>&passwd;</read-fs>
    <name>C.K Frode</name>
  </user>
</users>`;
