const { utils } = require('@contrast/test-bench-utils');

module.exports = function ServerSideJavaScriptModel() {
  const sinkData = utils.getSinkData('ssjs', 'kraken');
  const routeMeta = utils.getRouteMeta('ssjs');

  return {
    ...routeMeta,
    sinkData
  };
};
