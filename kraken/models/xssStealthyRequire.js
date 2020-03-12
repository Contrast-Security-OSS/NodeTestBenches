const { utils } = require('@contrast/test-bench-utils');

module.exports = function CrossSiteScriptingModel() {
  const sinkData = utils.getSinkData('xssStealthyRequire', 'kraken');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta('xssStealthyRequire');

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
