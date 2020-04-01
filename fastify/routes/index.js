module.exports = async function route(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return reply.view('index', options);
  });

  fastify.addHook('onSend', (request, reply, payload, done) => {
    if(request.raw.url.indexOf('/xss/hookSafe') === 0) {
      done(null, 'made safe');
    } else if (request.raw.url.indexOf('/xss/hookUnsafe') === 0) {
      done(null, request.query.input);
    } else {
      done(null, payload);
    }
  });

  fastify.get('/xss/reply', async (request, reply) => {
    reply.type('text/html');
    return reply.send(request.query.input);
  });

  fastify.get('/xss/return', async(request, reply) => {
    reply.type('text/html');
    return request.query.input;
  });

  fastify.get('/xss/hookSafe/return', async(request, reply) => {
    reply.type('text/html');
    return request.query.input;
  });

  fastify.get('/xss/hookUnsafe/return', async(request, reply) => {
    reply.type('text/html');
    return 'safe';
  });

  fastify.get('/xss/hookSafe/reply', async(request, reply) => {
    reply.type('text/html');
    return reply.send(request.query.input);
  });

  fastify.get('/xss/hookUnsafe/reply', async(request, reply) => {
    reply.type('text/html');
    return reply.send('safe');
  });

};
