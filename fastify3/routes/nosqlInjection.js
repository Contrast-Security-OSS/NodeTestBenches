'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: nosql-injection
 * @vulnerability: nosql-injection-mongo
 */
module.exports = controllerFactory('nosqlInjection', {
  locals: {
    attackValues: content.nosqlInjection
  }
});
