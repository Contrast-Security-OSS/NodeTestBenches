const { utils } = require('@contrast/test-bench-utils');

module.exports = function PathTraversalModel() {
  const sinkData = utils.getSinkData('pathTraversal', 'kraken');
  const routeMeta = utils.getRouteMeta('pathTraversal');

  return {
    ...routeMeta,
    sinkData
  };
};
