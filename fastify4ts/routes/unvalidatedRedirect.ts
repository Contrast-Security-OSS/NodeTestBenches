import { controllerFactory } from '../utils/controllerFactory';
import { FastifyRequest, FastifyReply } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
// @vulnerability: unvalidated-redirect
export = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'reply' },
  respond(result: any, request: FastifyRequest, reply: FastifyReply) {
    return result.status
      ? reply.redirect(301, result.path)
      : reply.redirect(result.path);
  },
});
