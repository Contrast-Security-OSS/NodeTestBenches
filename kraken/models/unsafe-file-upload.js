'use strict';
const {
  utils: { navRoutes },
  frameworkMapping: { kraken },
  routes: {
    unsafe_file_upload: { base }
  }
} = require('@contrast/test-bench-utils');

module.exports = function UFUModel() {
  const { method, key } = kraken.body;
  return {
    navRoutes,
    method,
    key,
    uri: base
  };
};
