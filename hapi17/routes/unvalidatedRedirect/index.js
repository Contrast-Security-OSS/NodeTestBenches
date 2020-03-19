'use strict';

const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.unvalidatedredirect';
exports.register = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'h' },
  respond(result, request, h) {
    return result.status
      ? h.redirect(result.path).code(301)
      : h.redirect(result.path);
  }
});
