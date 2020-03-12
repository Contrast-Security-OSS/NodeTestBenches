'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'ctx' },
  respond(request, reply) {
    reply.redirect(request.path);
  }
});
