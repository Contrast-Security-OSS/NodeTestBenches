'use strict';

const {
  sinks,
  frameworkMapping,
  routes,
  utils
} = require('@contrast/test-bench-utils');

module.exports = function SqlInjectionModel() {
  const { method, key } = frameworkMapping.kraken.query;
  return {
    method,
    key,
    sqli: sinks.sqli,
    viewData: utils.buildUrls({
      key,
      sinks: routes.sqli.sinks,
      baseUri: routes.sqli.base
    })
  };
};
