const { utils } = require('@contrast/test-bench-utils');

module.exports = function CrossSiteScriptingModel() {
  const sinkData = utils.getSinkData('xss', 'kraken');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta('xss');

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
