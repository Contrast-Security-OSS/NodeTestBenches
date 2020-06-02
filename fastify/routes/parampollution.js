'use strict';
module.exports = async function(fastify, options) {
  fastify.get('/parampollution', async (request, reply) => {
    reply.view('parampollution', options);
    return reply;
  });
};
