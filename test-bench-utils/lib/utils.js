'use strict';
const { kebabCase } = require('lodash');

/**
 * Builds the urls for a given rule
 *
 * @param {Array} sinks list of applicable sinks
 * @param {String} key relevant key on req object
 */
module.exports.buildUrls = ({ sinks, key, baseUri }) =>
  sinks.map((sink) => {
    const { code } = sink;
    const { lib } = sink;
    // Use function if object otherwise use string value
    // This is done after the code and lib
    sink = sink.function || sink;
    return {
      url: `${baseUri}/${key}/${kebabCase(sink)}`,
      uri: `/${key}/${kebabCase(sink)}`, // hapi uses relative urls
      sink,
      code,
      lib
    };
  });
