'use strict';
const {
  sinks: { ssjs },
  utils: { buildUrls, navRoutes },
  frameworkMapping: { kraken },
  routes: {
    ssjs: { base, sinks }
  }
} = require('@contrast/test-bench-utils');

module.exports = function SSJSModel() {
  const { method, key } = kraken.query;
  return {
    navRoutes,
    method,
    key,
    ssjs,
    viewData: buildUrls({ sinks, key, baseUri: base })
  };
};
