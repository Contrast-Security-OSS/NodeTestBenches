const { content, utils } = require('@contrast/test-bench-utils');

module.exports = function XmlExternalEntityModel() {
  const sinkData = utils.getSinkData('xpathInjection', 'kraken');
  const routeMeta = utils.getRouteMeta('xpathInjection');

  return {
    ...routeMeta,
    sinkData,
    xml: content.xpathInjection.xml
  };
};
