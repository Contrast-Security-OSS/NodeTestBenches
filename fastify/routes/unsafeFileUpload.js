'use strict';
const { routes, utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'koa');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

module.exports = async function route(fastify, options) {
  fastify.get(routes.unsafeFileUpload.base, async (request, reply) => {
    reply.view('unsafeFileUpload', {
      ...options,
      ...routeMeta,
      sinkData
    });
    return reply;
  });

  sinkData.forEach(({ method, url, sink }) => {
    fastify[method](url, async (request, reply) => {
      if (!request.isMultipart()) {
        reply.code(400).send(new Error('Request is not multipart'));
        return;
      }
      let result = '';
      function handler(field, file, filename, encoding, mimetype) {}

      function onEnd(err) {
        console.log('upload completed');
        reply.code(200).send(result);
      }

      const mp = request.multipart(handler, onEnd);

      mp.on('field', function(key, value) {
        result = sink(value);
      });
    });
  });
};
