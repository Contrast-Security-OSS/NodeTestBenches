'use strict';

module.exports = {
  cmd_injection: require('./cmd-injection'),
  path_traversal: require('./path-traversal'),
  sql_injection: require('./sql-injection'),
  ssjs: require('./ssjs-injection'),
  ssrf: require('./ssrf'),
  xss: require('./xss'),
  xxe: require('./xxe')
};
