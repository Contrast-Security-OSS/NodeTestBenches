module.exports = async function (fastify, options) {
  fastify.get('/header-injection', async (request, reply) => {
    return reply.view('header-injection', options);
  });

  fastify.get('/header-injection/inject', async (request, reply) => {
    const path = request.query.user_path;
    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', 0);

    reply.header('INJECTED', path);
    return `Injected header  ${path}`;
  });
};
