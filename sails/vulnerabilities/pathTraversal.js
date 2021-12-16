'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: path-traversal
 */
module.exports = function(app, locals) {
  return controllerFactory('pathTraversal', app, { locals });
}
