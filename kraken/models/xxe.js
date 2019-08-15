const { content, utils } = require('@contrast/test-bench-utils');

module.exports = function XmlExternalEntityModel() {
  const sinkData = utils.getSinkData('xxe', 'kraken');

  return {
    sinkData,
    attackXml: content.xxe.attackXml
  };
};
