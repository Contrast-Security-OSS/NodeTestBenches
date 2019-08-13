'use strict';

module.exports = {
  cmd_injection: require('./cmd-injection'),
  path_traversal: require('./path-traversal'),
  sqlInjection: require('./sqlInjection'),
  ssjs: require('./ssjs-injection'),
  ssrf: require('./ssrf'),
  xss: require('./xss'),
  xxe: require('./xxe')
};
