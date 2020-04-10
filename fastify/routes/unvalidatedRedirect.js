'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'reply' },
  respond(result, request, reply) {
    return reply.redirect(request.query.input);
  }
});
