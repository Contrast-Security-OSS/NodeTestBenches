const { utils } = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

module.exports = function ServerSideRequestForgeryModel() {
  const sinkData = utils.getSinkData('ssrf', 'kraken');
  const routeMeta = utils.getRouteMeta('ssrf');

  return {
    ...routeMeta,
    requestUrl: EXAMPLE_URL,
    sinkData
  };
};
