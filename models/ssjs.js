const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function ServerSideJavaScriptModel() {
  const sinkData = utils.getSinkData('ssjs', 'kraken');

  return {
    sinkData,
    name: routes.ssjs.name,
    link: routes.ssjs.link,
    navRoutes: utils.navRoutes
  };
};
