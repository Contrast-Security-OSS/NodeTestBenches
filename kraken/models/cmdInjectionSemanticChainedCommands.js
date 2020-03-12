const { utils } = require('@contrast/test-bench-utils');

module.exports = function CommandInjectionSemanticChainedCommandsModel() {
  const sinkData = utils.getSinkData(
    'cmdInjectionSemanticChainedCommands',
    'kraken'
  );
  const routeMeta = utils.getRouteMeta('cmdInjectionSemanticChainedCommands');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return {
    ...routeMeta,
    sinkData,
    groupedSinkData
  };
};
