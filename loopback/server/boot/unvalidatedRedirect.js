'use strict';

const controllerFactory = require('../utils/controllerFactory');

module.exports = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'res' },
  respond(result, req, res) {
    result.status ? res.redirect(301, result.path) : res.redirect(result.path);
  }
});
