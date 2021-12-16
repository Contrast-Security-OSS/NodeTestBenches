'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: ssjs-injection
 */
module.exports = function(app, locals) {
  return controllerFactory('ssjs', app, { locals });
}
