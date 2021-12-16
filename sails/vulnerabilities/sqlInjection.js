'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: sql-injection
 */
module.exports = function(app, locals) {
  return controllerFactory('sqlInjection', app, { locals });
}
