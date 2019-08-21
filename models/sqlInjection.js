const { utils } = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('sqlInjection', 'kraken');
  const routeMeta = utils.getRouteMeta('sqlInjection');

  return {
    ...routeMeta,
    sinkData
  };
};
