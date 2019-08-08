'use strict';
const {
  frameworkMapping: { kraken },
  routes: {
    unvalidated_redirect: { base }
  }
} = require('@contrast/test-bench-utils');

module.exports = function UnvalidatedRedirectModel() {
  const { method, key } = kraken.query;
  return {
    url: base,
    res: 'res',
    method,
    key
  };
};
