import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
// @vulnerability: csp-header-insecure
export = async function(fastify: FastifyInstance, options: any) {
  const unsafePolicy = [
    "default-src 'none'",
    'font-src *',
    'img-src *',
    'media-src *',
    'script-src *',
    "style-src 'unsafe-inline' *"
  ].join('; ');

  fastify.get('/csp-header', (request: FastifyRequest, reply: FastifyReply) => {
    reply.header('Content-Security-Policy', unsafePolicy);
    reply.view('csp-header', { ...options, policy: unsafePolicy });
    return reply;
  });
};
