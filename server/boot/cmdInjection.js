'use strict';

const controllerFactory = require('../utils/controllerFactory');

module.exports = function(server) {
  const controller = controllerFactory('cmdInjection', { server });
  server.use('/cmdInjection', controller);
};
