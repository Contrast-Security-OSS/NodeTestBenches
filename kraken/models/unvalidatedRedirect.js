const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function UnvalidatedRedirectModel() {
  const sinkData = utils.getSinkData('unvalidatedRedirect', 'kraken');

  return {
    sinkData,
    name: routes.unvalidatedRedirect.name,
    link: routes.unvalidatedRedirect.link,
    res: 'res'
  };
};
