import { FastifyInstance } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function route(fastify: FastifyInstance, options: any) {
  fastify.get('/', async (request, reply) => {
    reply.view('index', options);
    return reply;
  });
};
