const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function UnsafeFileUploadModel() {
  const sinkData = utils.getSinkData('unsafeFileUpload', 'kraken');

  return {
    sinkData,
    name: routes.unsafeFileUpload.name,
    link: routes.unsafeFileUpload.link
  };
};
