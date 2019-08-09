'use strict';

module.exports = {
  rules: require('./rules'),
  sinks: require('./sinks'),
  frameworkMapping: require('./frameworkMapping').INPUT_MAPPING,
  routes: require('./routes'),
  utils: require('./utils')
};
