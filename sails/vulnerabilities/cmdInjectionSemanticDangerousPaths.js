'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: cmd-injection-semantic-dangerous-paths
 */
module.exports = function(app, locals) {
  return controllerFactory('cmdInjectionSemanticDangerousPaths', app, { locals });
}
