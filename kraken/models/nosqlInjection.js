const { content, utils } = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('nosqlInjection', 'kraken');
  const routeMeta = utils.getRouteMeta('nosqlInjection');

  return {
    ...routeMeta,
    sinkData,
    attackValues: content.nosqlInjection
  };
};
