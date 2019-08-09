'use strict';

const {
  utils: { getViewData, navRoutes },
  routes: {
    sql_injection: { name, link }
  }
} = require('@contrast/test-bench-utils');

module.exports = function SqlInjectionModel() {
  return {
    viewData: getViewData('sql_injection', 'kraken'),
    name,
    link,
    navRoutes
  };
};
