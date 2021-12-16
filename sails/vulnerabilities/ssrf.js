'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: ssrf
 */
module.exports = function(app, locals) {
  return controllerFactory('ssrf', app, {
    locals: {
      requestUrl: content.ssrf.url,
      ...locals
    }}
  );
}
