const { utils } = require('@contrast/test-bench-utils');

module.exports = function UnvalidatedRedirectModel() {
  const sinkData = utils.getSinkData('unvalidatedRedirect', 'kraken');
  const routeMeta = utils.getRouteMeta('unvalidatedRedirect');

  return {
    ...routeMeta,
    sinkData,
    res: 'res'
  };
};
