'use strict';

const controllerFactory = require('../../utils/controllerFactory');

module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'res' },
  respond(result, req, res, next) {
    result.status ? res.redirect(301, result.path, next) : res.redirect(result.path, next);
  }
});
