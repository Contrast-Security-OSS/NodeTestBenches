'use strict';

const controllerFactory = require('../utils/controllerFactory');
module.exports = function(app, locals) {
  return controllerFactory('crypto', app, { locals });
}
