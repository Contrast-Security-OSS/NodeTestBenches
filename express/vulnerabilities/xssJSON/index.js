'use strict';

const controllerFactory = require('../../utils/controllerFactory');

const respond = (result, req, res, next) => {
  res.json(result);
}

module.exports = controllerFactory('xssJSON', { respond });
