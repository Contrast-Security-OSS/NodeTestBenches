const _ = require('lodash');

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

  const routes = [
    {
      suffix: "xss/reply",
      handler: async function handler(request, reply) {
        reply.type("text/html");
        return reply.send(request.query.input);
      }
    },
    {
      suffix: "xss/return",
      handler: async function handler(request, reply) {
        reply.type("text/html");
        return request.query.input;
      }
    },
    {
      suffix: "xss/hookSafe/reply",
      handler: async function handler(request, reply) {
        reply.type("text/html");
        return reply.send(request.query.input);
      }
    },
    {
      suffix: "xss/hookSafe/return",
      handler: async function handler(request, reply) {
        reply.type("text/html");
        return request.query.input;
      }
    },
    {
      suffix: "xss/hookUnsafe/reply",
      handler: async function handler(request, reply) {
        reply.type("text/html");
        return reply.send('safe');
      }
    },
    {
      suffix: "xss/hookUnsafe/return",
      handler: async function handler(request, reply) {
        reply.type("text/html");
        return 'safe';
      }
    }
  ]

  // add fastify.get routes
  _.each(routes, (route) => {
    fastify.get(`/get/${route.suffix}`, route.handler);
  });

  // add fasify.route routes with a string method
  _.each(routes, (route) => {
    fastify.route({
      method: 'GET',
      path: `/route/string/${route.suffix}`,
      handler: route.handler
    });
  });

  // add fastify.route routes with an array method
  _.each(routes, (route) => {
    fastify.route({
      method: ['GET'],
      path: `/route/array/${route.suffix}`,
      handler: route.handler
    });
  });

};
