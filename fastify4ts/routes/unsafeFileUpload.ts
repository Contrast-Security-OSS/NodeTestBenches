/* eslint-disable @typescript-eslint/no-explicit-any */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { routes, utils } from '@contrast/test-bench-utils';
import { isEmpty } from 'lodash';

const routeMeta = utils.getRouteMeta('unsafeFileUpload');
const sinkData = utils.getSinkData('unsafeFileUpload', 'express');

interface IFastifyInstance extends FastifyInstance {
  [index: string]: any
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function route(fastify: IFastifyInstance, options: any) {
  fastify.get(routes.unsafeFileUpload.base, async (request: FastifyRequest, reply: FastifyReply) => {
    reply.view('unsafeFileUpload', { ...options, ...routeMeta, sinkData });
    return reply;
  });

  sinkData.forEach((v: { method: string, params: any, url: string, sinks: any, key: any }) => {
    fastify[v.method](v.url, async (req: any, reply: any) => {
      const inputs = utils.getInput(req, v.key, v.params);
      // We sometimes use these routes just to test UFU and there is no input
      // Just return 'done' in that case
      if (isEmpty(inputs)) {
        return 'done';
      } else {
        return await v.sinks.unsafe(inputs);
      }
    });
  });
};
