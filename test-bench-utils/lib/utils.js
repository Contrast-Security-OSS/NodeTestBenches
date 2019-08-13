'use strict';
const { camelCase, groupBy, map, reduce } = require('lodash');

const MAPPING = require('./frameworkMapping');
const routes = require('./routes');

/**
 * @typedef {Object} SinkData
 * @property {string} input unmapped input key usder which user input lies
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
      const { key, method, param } = MAPPING[framework][input];
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

module.exports.attackXml = `
<!DOCTYPE read-fs [<!ELEMENT read-fs ANY >
<!ENTITY passwd SYSTEM "file:///etc/passwd" >]>
<users>
  <user>
    <read-fs>&passwd;</read-fs>
    <name>C.K Frode</name>
  </user>
</users>`;

module.exports.navRoutes = map(routes, ({ base, name, products }) => ({
  base,
  name,
  products
}));
