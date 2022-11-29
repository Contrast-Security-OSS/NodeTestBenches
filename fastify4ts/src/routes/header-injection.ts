import { FastifyInstance } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function (fastify: FastifyInstance, options: any) {
  fastify.get('/header-injection', async (request, reply) => {
    reply.view('header-injection', options);
    return reply;
  });

  fastify.get('/header-injection/inject', async (request, reply) => {
    const path = (request.query as Record<string, any>).user_path;

    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', 0);

    reply.header('INJECTED', path);
    return `Injected header  ${path}`;
  });
};
