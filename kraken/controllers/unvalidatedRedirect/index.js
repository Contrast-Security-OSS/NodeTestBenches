'use strict';

const controllerFactory = require('../../utils/controllerFactory');

module.exports = controllerFactory('unvalidatedRedirect', {
  respond(result, req, res) {
    result.status ? res.redirect(302, result.path) : res.redirect(result.path);
  }
});
