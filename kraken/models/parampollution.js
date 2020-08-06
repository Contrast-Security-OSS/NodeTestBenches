const { utils } = require('@contrast/test-bench-utils');

module.exports = function ParamPollutionModel() {
  const sinkData = utils.getSinkData('parampollution', 'kraken');
  const routeMeta = utils.getRouteMeta('parampollution');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
