/* eslint-disable @typescript-eslint/no-explicit-any */

import { routes, utils } from '@contrast/test-bench-utils';
import { FastifyInstance } from 'fastify';
import { isEmpty } from 'lodash';

const routeMeta = utils.getRouteMeta('unsafeFileUpload');
const sinkData = utils.getSinkData('unsafeFileUpload', 'express');

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function route(fastify: FastifyInstance, options: any) {
  fastify.get(routes.unsafeFileUpload.base, async (request, reply) => {
    reply.view('unsafeFileUpload', { ...options, ...routeMeta, sinkData });
    return reply;
  });

  sinkData.forEach((v) => {
    fastify[v.method](v.url, async (req, reply) => {
      const inputs = utils.getInput(req.raw, v.key, v.params);
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
