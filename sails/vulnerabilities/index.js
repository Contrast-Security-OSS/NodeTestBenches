module.exports = async function route(fastify, options) {
  fastify.get('/', async (request, reply) => {
    reply.view('index', options);
    return reply;
  });
};
