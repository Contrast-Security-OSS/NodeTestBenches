'use strict';
const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.ssrf';
exports.register = controllerFactory('ssrf', {
  locals: {
    requestUrl: content.ssrf.url
  }
});
