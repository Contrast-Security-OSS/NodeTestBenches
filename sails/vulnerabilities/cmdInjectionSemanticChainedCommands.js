'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: cmd-injection-semantic-chained-commands
 */
module.exports = function(app, locals) {
  return controllerFactory('cmdInjectionSemanticChainedCommands', app, { locals });
}
