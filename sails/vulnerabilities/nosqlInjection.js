'use strict';

const {
  content: {
    nosqlInjection: {
      attackValues,
      descriptions
    }
  }
} = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: nosql-injection
 * @vulnerability: nosql-injection-mongo
 */
module.exports = function(app, locals) {
  return controllerFactory('nosqlInjection', app, {
    locals: {
      attackValues,
      descriptions,
      ...locals
    }
  });
};
