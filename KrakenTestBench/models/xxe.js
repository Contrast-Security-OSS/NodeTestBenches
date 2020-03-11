const { content, utils } = require('@contrast/test-bench-utils');

module.exports = function XmlExternalEntityModel() {
  const sinkData = utils.getSinkData('xxe', 'kraken');
  const routeMeta = utils.getRouteMeta('xxe');

  return {
    ...routeMeta,
    sinkData,
    input: content.xxe.attackXml
  };
};
