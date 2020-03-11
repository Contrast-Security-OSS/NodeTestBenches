'use strict';

const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'ctx' },
  respond(result, ctx) {
    if (result.status) {
      ctx.status = 301;
    }

    ctx.redirect(result.path);
  }
});
