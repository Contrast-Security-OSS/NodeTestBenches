'use strict';

const { kebabCase, map, reduce } = require('lodash');

const MAPPING = require('./frameworkMapping');
const routes = require('./routes');

/**
 * @typedef {Object} ViewData
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
 * Builds the urls for a given rule
 *
 * @param {object}            opts
 * @param {string[]|object[]} opts.sinks   list of applicable sinks
 * @param {string}            opts.key     relevant key on req object
 * @param {string}            opts.baseUri the base URI to use when constructing urls
 * @param {string}            opts.method  the method being handled
 * @return {ViewData[]}
 */
function viewData({ sinks, key, baseUri, method }) {
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

module.exports.buildUrls = viewData;

/**
 * @param {string} vuln      the vulnerability/sink being tested (ssrf, xss, etc)
 * @param {string} framework the framework being used (express, koa, etc)
 * @return {ViewData[]}
 */
module.exports.getViewData = function getViewData(vuln, framework) {
  const { base, inputs, sinks } = routes[vuln];

  return reduce(
    inputs,
    (data, input) => {
      const { method, key } = MAPPING[framework][input];
      return [...data, ...viewData({ sinks, key, baseUri: base, method })];
    },
    []
  );
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
