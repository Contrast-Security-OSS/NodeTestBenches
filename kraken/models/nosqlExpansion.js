const { utils } = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('nosqlExpansion', 'kraken');
  const routeMeta = utils.getRouteMeta('nosqlExpansion');

  return {
    ...routeMeta,
    sinkData
  };
};
