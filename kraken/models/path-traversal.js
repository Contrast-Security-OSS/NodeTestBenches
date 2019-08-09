'use strict';
const {
  sinks: { path_traversal: fs },
  utils: { buildUrls, navRoutes },
  frameworkMapping: { kraken },
  routes: {
    path_traversal: { base, sinks }
  }
} = require('@contrast/test-bench-utils');

module.exports = function CmdInjectionModel() {
  const { method, key } = kraken.query;
  return {
    navRoutes,
    method,
    key,
    fs,
    viewData: buildUrls({ sinks, key, baseUri: base })
  };
};
