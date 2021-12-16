'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: xml-external-entity
 */
module.exports = function(app, locals) {
  return controllerFactory('xxe', app, { locals });
}
