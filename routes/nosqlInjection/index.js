'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.nosqlinjection';
exports.register = controllerFactory('nosqlInjection', {
  locals: {
    attackValues: content.nosqlInjection
  }
});
