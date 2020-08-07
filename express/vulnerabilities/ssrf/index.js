'use strict';
const { content } = require('@contrast/test-bench-utils');
const { get } = require('lodash');
const controllerFactory = require('../../utils/controllerFactory');

module.exports = controllerFactory('ssrf', {
  getInput({ req, key }) {
    const { input, part } = get(req, key);
    return [input, part];
  },
  locals: {
    requestUrl: content.ssrf.url
  }
});

