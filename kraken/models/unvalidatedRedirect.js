const { utils } = require('@contrast/test-bench-utils');

module.exports = function UnvalidatedRedirectModel() {
  const sinkData = utils.getSinkData('unvalidatedRedirect', 'kraken');

  return {
    sinkData,
    res: 'res'
  };
};
