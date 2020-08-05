const { utils, content } = require('@contrast/test-bench-utils');

module.exports = function ServerSideRequestForgeryModel() {
  const sinkData = utils.getSinkData('ssrf', 'kraken');
  const routeMeta = utils.getRouteMeta('ssrf');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return {
    ...routeMeta,
    requestUrl: content.ssrf.url,
    sinkData,
    groupedSinkData
  };
};
