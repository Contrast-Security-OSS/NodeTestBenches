const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function CrossSiteScriptingModel() {
  const sinkData = utils.getSinkData('xss', 'kraken');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return {
    sinkData,
    name: routes.xss.name,
    link: routes.xss.link,
    navRoutes: utils.navRoutes,
    groupedSinkData
  };
};
