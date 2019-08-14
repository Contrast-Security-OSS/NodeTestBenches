const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('sqlInjection', 'kraken');

  return {
    sinkData,
    name: routes.xss.name,
    link: routes.xss.link,
    navRoutes: utils.navRoutes
  };
};
