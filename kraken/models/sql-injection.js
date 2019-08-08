'use strict';

const { utils } = require('@contrast/test-bench-utils');

module.exports = function SqlInjectionModel() {
  return { viewData: utils.getViewData('sql_injection', 'kraken') };
};
