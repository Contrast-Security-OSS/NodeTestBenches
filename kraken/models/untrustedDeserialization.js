const { utils } = require('@contrast/test-bench-utils');

module.exports = function CommandInjectionModel() {
  const sinkData = utils.getSinkData('untrustedDeserialization', 'kraken');
  const routeMeta = utils.getRouteMeta('untrustedDeserialization');
  console.log('here', sinkData);

  return {
    ...routeMeta,
    sinkData
  };
};
