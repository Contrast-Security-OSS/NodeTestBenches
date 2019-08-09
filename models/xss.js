const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function CrossSiteScriptingModel() {
  const sinkData = utils.getSinkData('xss', 'kraken');
  const viewData = utils.groupSinkData(sinkData);

  return {
    viewData,
    sinkData,
    name: routes.xss.name,
    link: routes.xss.link,
    navRoutes: utils.navRoutes
  };
};
