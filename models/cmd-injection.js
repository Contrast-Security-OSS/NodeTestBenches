'use strict';
const {
  sinks: { cmd_injection: cmdi },
  utils: { buildUrls },
  frameworkMapping: { kraken },
  routes: {
    cmd_injection: { base, sinks }
  }
} = require('@contrast/test-bench-utils');

module.exports = function CmdInjectionModel() {
  const { method, key } = kraken.query;
  return {
    method,
    key,
    cmdi,
    viewData: buildUrls({ sinks, key, baseUri: base })
  };
};
