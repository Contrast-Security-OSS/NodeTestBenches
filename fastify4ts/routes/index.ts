import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function route(fastify: FastifyInstance, options: any) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('index', options);
    return reply;
  });
};
