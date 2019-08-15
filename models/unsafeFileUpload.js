const { utils } = require('@contrast/test-bench-utils');

module.exports = function UnsafeFileUploadModel() {
  const sinkData = utils.getSinkData('unsafeFileUpload', 'kraken');

  return {
    sinkData
  };
};
