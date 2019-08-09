'use strict';
const {
  sinks: { cmd_injection: cmdi },
  utils: { buildUrls, navRoutes },
  frameworkMapping: { kraken },
  routes: {
    cmd_injection: { base, sinks, name, link }
  }
} = require('@contrast/test-bench-utils');

module.exports = function CmdInjectionModel() {
  const { method, key } = kraken.query;
  return {
    navRoutes,
    base,
    name,
    link,
    method,
    key,
    cmdi,
    viewData: buildUrls({ sinks, key, baseUri: base })
  };
};
