'use strict';

module.exports = {
  cmd_injection: require('./cmd-injection'),
  path_traversal: require('./path-traversal'),
  sqli: require('./sql-injection'),
  ssjs: require('./ssjs-injection'),
  ssrf: require('./ssrf'),
  xxe: require('./xxe')
};
