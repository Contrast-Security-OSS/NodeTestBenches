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

module.exports = controllerFactory('nosqlInjection', {
  locals: {
    attackValues,
    descriptions
  }
});
