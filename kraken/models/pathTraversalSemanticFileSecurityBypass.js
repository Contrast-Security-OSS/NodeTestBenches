const { utils } = require('@contrast/test-bench-utils');

module.exports = function PathTraversalModel() {
  const sinkData = utils.getSinkData('pathTraversalSemanticFileSecurityBypass', 'kraken');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta('pathTraversalSemanticFileSecurityBypass');

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
