const { utils } = require('@contrast/test-bench-utils');

module.exports = function CrossSiteScriptingModel() {
  const sinkData = utils.getSinkData('xssRenderedTemplates', 'kraken');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta('xssRenderedTemplates');

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
