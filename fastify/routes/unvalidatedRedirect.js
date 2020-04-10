'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'reply' },
  respond(result, request, reply) {
    return result.status ?
      reply.redirect(301, request.query.input) :
      reply.redirect(request.query.input);
  }
});
