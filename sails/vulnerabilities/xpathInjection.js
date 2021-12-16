'use strict';

const {
  content: {
    xpathInjection: { xml }
  }
} = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

module.exports = function(app, locals) {
  return controllerFactory('xpathInjection', app, {
    locals: {
      xml,
      ...locals
    }
  });
}
