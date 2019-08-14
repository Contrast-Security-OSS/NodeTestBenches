const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function CommandInjectionModel() {
  const sinkData = utils.getSinkData('cmdInjection', 'kraken');

  return {
    sinkData,
    name: routes.cmdInjection.name,
    link: routes.cmdInjection.link
  };
};
