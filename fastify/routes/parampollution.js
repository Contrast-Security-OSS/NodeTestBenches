'use strict';
module.exports = async function (fastify, options) {
  fastify.get('/parampollution', async (request, reply) => {
    return reply.view('parampollution', options);
  });

  fastify.post('/parampollution', async (request, reply) => {
    return reply.view('parampollution', options);
  });
};
