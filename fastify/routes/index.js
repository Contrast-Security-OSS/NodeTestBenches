module.exports = async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return reply.view('index', options);
  });
};
