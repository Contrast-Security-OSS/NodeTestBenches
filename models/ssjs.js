const { utils } = require('@contrast/test-bench-utils');

module.exports = function ServerSideJavaScriptModel() {
  const sinkData = utils.getSinkData('ssjs', 'kraken');

  return {
    sinkData
  };
};
