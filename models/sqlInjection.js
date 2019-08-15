const { utils } = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('sqlInjection', 'kraken');

  return {
    sinkData
  };
};
