'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: nosql-expansion
 * @vulnerability: nosql-expansion-mongo
 */
module.exports = function(app, locals) {
  return controllerFactory('nosqlExpansion', app, {locals});
}
