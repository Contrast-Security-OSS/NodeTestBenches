import { controllerFactory } from '../utils/controllerFactory';
import { FastifyRequest, FastifyReply } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
const respond = (result: any, request: FastifyRequest, reply: FastifyReply) => {
  // default respond sets content type - don't do that here
  reply.send(result);
};

// @vulnerability: reflected-xss
export = controllerFactory('xssJSON', { respond });
