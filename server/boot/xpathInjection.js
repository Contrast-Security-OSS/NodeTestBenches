'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

module.exports = controllerFactory('xpathInjection', {
  locals: {
    xml: content.xpathInjection.xml
  }
});
