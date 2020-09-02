'use strict';

const { utils } = require('@contrast/test-bench-utils');

module.exports = function BaseResponseScanningRuleModel(vulnerability) {
  this.vulnerability = vulnerability;
  const sinkData = utils.getSinkData(vulnerability, 'kraken');
  const routeMeta = utils.getRouteMeta(vulnerability);
  const groupedSinkData = utils.groupSinkData(sinkData);
  const responsePreparer = utils.getResponsePreparer(vulnerability);

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData,
    responsePreparer
  };
};
