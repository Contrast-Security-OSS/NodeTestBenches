'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: reflected-xss
 */
module.exports = controllerFactory('xss');
