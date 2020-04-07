'use strict';
const { routes, utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'koa');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');
const path = require('path');
const dest = path.resolve(__dirname, '..', 'uploads');
const pump = require('pump');
const fs = require('fs');

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
    fastify[method](url, (request, reply) => {
      if (!request.isMultipart()) {
        reply.code(400).send(new Error('Request is not multipart'));
        return;
      }
      let result;

      async function handler(field, file, filename, encoding, mimetype) {
        await pump(file, fs.createWriteStream(`${dest}/${filename}`));
      }

      function onEnd(err) {
        reply.code(200).send(result);
        return;
      }

      const mp = request.multipart(handler, onEnd);

      mp.on('field', async function(key, value) {
        result = await sink(value);
      });
    });
  });
};
