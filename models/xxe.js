const { utils, routes } = require('@contrast/test-bench-utils');

module.exports = function XmlExternalEntityModel() {
  const sinkData = utils.getSinkData('xxe', 'kraken');

  return {
    sinkData,
    name: routes.xxe.name,
    link: routes.xxe.link,
    navRoutes: utils.navRoutes,
    attackXml: utils.attackXml
  };
};
