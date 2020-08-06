const { utils } = require('@contrast/test-bench-utils');

module.exports = function CryptoModel() {
  const sinkData = utils.getSinkData('crypto', 'kraken');
  const routeMeta = utils.getRouteMeta('crypto');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
