'use strict';

module.exports = {
  cmdInjection: require('./cmdInjection'),
  pathTraversal: require('./pathTraversal'),
  sqlInjection: require('./sqlInjection'),
  ssjs: require('./ssjs-injection'),
  ssrf: require('./ssrf'),
  xss: require('./xss'),
  xxe: require('./xxe')
};
