module.exports = async function route(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return reply.view('index', options);
  });
};
