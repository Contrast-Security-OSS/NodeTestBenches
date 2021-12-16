'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: untrusted-deserialization
 */
module.exports = function(app, locals) {
  return  controllerFactory('untrustedDeserialization', app, { locals });
}
