'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.xpathInjection';
exports.register = controllerFactory('xpathInjection', {
  locals: { xml: content.xpathInjection.xml }
});
