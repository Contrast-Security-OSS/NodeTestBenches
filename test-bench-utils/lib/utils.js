'use strict';
const { kebabCase } = require('lodash');

/**
 * Builds the urls for a given rule
 *
 * @param {Array} sinks list of applicable sinks
 * @param {String} key relevant key on req object
 */
module.exports.buildUrls = ({ sinks, key, baseUri }) =>
  sinks.map((sink) => ({
    url: `${baseUri}/${key}/${kebabCase(sink)}`,
    uri: `/${key}/${kebabCase(sink)}`, // hapi uses relative urls
    sink
  }));
