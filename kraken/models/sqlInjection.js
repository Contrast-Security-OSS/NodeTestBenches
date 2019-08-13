'use strict';

const {
  utils: { getViewData, navRoutes },
  routes: {
    sqlInjection: { name, link }
  }
} = require('@contrast/test-bench-utils');

module.exports = function SqlInjectionModel() {
  return {
    viewData: getViewData('sqlInjection', 'kraken'),
    name,
    link,
    navRoutes
  };
};
