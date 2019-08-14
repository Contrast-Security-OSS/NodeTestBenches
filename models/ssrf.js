const { utils, routes } = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

module.exports = function ServerSideRequestForgeryModel() {
  const sinkData = utils.getSinkData('ssrf', 'kraken');

  return {
    requestUrl: EXAMPLE_URL,
    sinkData,
    name: routes.ssrf.name,
    link: routes.ssrf.link
  };
};
