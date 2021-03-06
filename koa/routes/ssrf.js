'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: ssrf
 */
module.exports = controllerFactory('ssrf', {
  locals: {
    requestUrl: content.ssrf.url
  }
});
