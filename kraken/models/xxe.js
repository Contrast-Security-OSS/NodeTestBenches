'use strict';
const {
  sinks: { xxe },
  utils: { attackXml },
  frameworkMapping: { kraken },
  routes: {
    xxe: { base, sinks }
  }
} = require('@contrast/test-bench-utils');

module.exports = function XXEModel() {
  const { method } = kraken.body;
  return {
    xxe,
    url: base,
    sinks,
    method,
    attackXml
  };
};
