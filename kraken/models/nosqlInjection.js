const { content, utils } = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('nosqlInjection', 'kraken');

  return {
    sinkData,
    attackValues: content.nosqlInjection
  };
};
