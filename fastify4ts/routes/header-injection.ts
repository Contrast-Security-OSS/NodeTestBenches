import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function (fastify: FastifyInstance, options: any) {
  fastify.get('/header-injection', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('header-injection', options);
    return reply;
  });

  fastify.get('/header-injection/inject', async (request: FastifyRequest | any, reply: FastifyReply) => {
    const path = request.query.user_path;
    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', 0);

    reply.header('INJECTED', path);
    return `Injected header  ${path}`;
  });
};
