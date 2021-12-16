'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: cmd-injection
 */
module.exports = function(app, locals) {
  return controllerFactory('parampollution', app, { locals });
}
