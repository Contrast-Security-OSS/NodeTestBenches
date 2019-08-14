const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function PathTraversalModel() {
  const sinkData = utils.getSinkData('pathTraversal', 'kraken');

  return {
    sinkData,
    name: routes.pathTraversal.name,
    link: routes.pathTraversal.link
  };
};
