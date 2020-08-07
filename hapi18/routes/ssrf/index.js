'use strict';
const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');
const { get } = require('lodash');

exports.name = 'hapitestbench.ssrf';
exports.register = controllerFactory('ssrf', {
  getInput({ req, key }) {
    const { input, part } = get(req, key);
    return [input, part];
  },
  locals: {
    requestUrl: content.ssrf.url
  }
});
