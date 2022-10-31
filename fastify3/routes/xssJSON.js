'use strict';

const controllerFactory = require('../utils/controllerFactory');

const respond = (result, request, reply) => {
  //default respond sets content type - don't do that here
  reply.send(result);
};

/**
 * @vulnerability: reflected-xss
 */
module.exports = controllerFactory('xssJSON', { respond });
