const { utils } = require('@contrast/test-bench-utils');

module.exports = function CommandInjectionSemanticDangerousPathsModel() {
  const sinkData = utils.getSinkData(
    'cmdInjectionSemanticDangerousPaths',
    'kraken'
  );
  const routeMeta = utils.getRouteMeta('cmdInjectionSemanticDangerousPaths');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
