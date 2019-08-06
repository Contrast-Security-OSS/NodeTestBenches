'use strict';
const {
  sinks: { ssrf },
  frameworkMapping: { kraken },
  routes: {
    ssrf: { sinks }
  }
} = require('@contrast/test-bench-utils');
const EXAMPLE_URL = 'http://www.example.com';

module.exports = function CmdInjectionModel() {
  const { method, key } = kraken.query;
  return {
    requestUrl: EXAMPLE_URL,
    method,
    key,
    ssrf,
    sinks
  };
};
