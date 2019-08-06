'use strict';

module.exports = {
  sinks: {
    ssrf: require('./sinks/ssrf'),
    cmd_injection: require('./sinks/cmd-injection'),
    path_traversal: require('./sinks/path-traversal')
  },
  routes: require('./routes'),
  frameworkMapping: require('./frameworkMapping'),
  utils: require('./utils')
};
