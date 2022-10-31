'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: untrusted-deserialization
 */
module.exports = controllerFactory('untrustedDeserialization');
