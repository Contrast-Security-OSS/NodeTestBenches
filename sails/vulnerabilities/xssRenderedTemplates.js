'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: xssRenderedTemplates
 */
module.exports = function(app, locals) {
  return controllerFactory('xssRenderedTemplates', app, { locals });
}
