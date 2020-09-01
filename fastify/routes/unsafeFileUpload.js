'use strict';

const { routes, utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'express');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');
const { isEmpty } = require('lodash');

module.exports = async function route(fastify, options) {
  fastify.get(routes.unsafeFileUpload.base, async (request, reply) => {
    reply.view('unsafeFileUpload', {
      ...options,
      ...routeMeta,
      sinkData
    });
    return reply;
  });

  sinkData.forEach(({ method, params, url, sink, key }) => {
    fastify[method](url, async (req, reply) => {
      const inputs = utils.getInput(req, key, params);
      // We sometimes use these routes just to test UFU and there is no input
      // Just return 'done' in that case
      if (isEmpty(inputs)) {
        return 'done';
      } else {
        return await sink(inputs);
      }
    });
  });
};
