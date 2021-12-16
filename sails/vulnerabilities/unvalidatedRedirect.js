'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = function(app, locals) {
  return controllerFactory('unvalidatedRedirect', app, {
    locals: { res: 'reply', ...locals },
    respond(result, request, reply) {
      return result.status
        ? reply.redirect(301, result.path)
        : reply.redirect(result.path);
    }
  });
}
