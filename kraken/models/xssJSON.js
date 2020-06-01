const { utils } = require('@contrast/test-bench-utils');

module.exports = function CrossSiteScriptingModel() {
  const sinkData = utils.getSinkData('xssJSON', 'kraken');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta('xssJSON');

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
