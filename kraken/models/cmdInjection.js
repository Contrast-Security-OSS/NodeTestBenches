const { utils } = require('@contrast/test-bench-utils');

module.exports = function CommandInjectionModel() {
  const sinkData = utils.getSinkData('cmdInjection', 'kraken');
  const routeMeta = utils.getRouteMeta('cmdInjection');

  return {
    ...routeMeta,
    sinkData
  };
};
