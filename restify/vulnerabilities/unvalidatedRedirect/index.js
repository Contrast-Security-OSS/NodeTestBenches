'use strict';

const controllerFactory = require('../../utils/controllerFactory');

module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'res' },
  respond(result, req, res, next) {
    if (result.status) {
      res.redirect(301, result.path, next);
    } else if (result.hostname) {
      res.redirect({ hostname: result.path, pathname: '/' }, next);
    } else {
      res.redirect(result.path, next);
    }
  },
});
