'use strict';

module.exports = {
  rules: require('./rules'),
  sinks: {
    ssrf: require('./sinks/ssrf'),
    cmd_injection: require('./sinks/cmd-injection'),
    path_traversal: require('./sinks/path-traversal'),
    ssjs: require('./sinks/ssjs-injection'),
    xxe: require('./sinks/xxe')
  },
  routes: require('./routes'),
  frameworkMapping: require('./frameworkMapping'),
  utils: require('./utils')
};
