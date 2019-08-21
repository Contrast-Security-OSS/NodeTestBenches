'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: cmd-injection
 */
module.exports = controllerFactory('cmdInjection');
