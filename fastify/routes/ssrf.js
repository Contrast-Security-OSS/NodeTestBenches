'use strict';

const { get } = require('lodash');

const { routes, utils } = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';
const { base } = routes.ssrf;
const sinkData = utils.getSinkData('ssrf', 'koa');
const routeMeta = utils.getRouteMeta('ssrf');

/**
 * @vulnerability: ssrf
 */
module.exports = async function routes(fastify, options) {
  fastify.get(`${base}`, async (request, reply) => {
    reply.view('ssrf', {
      ...options,
      ...routeMeta,
      requestUrl: EXAMPLE_URL,
      sinkData
    });
    return reply;
  });

  sinkData.forEach(({ method, name, sink, key }) => {
    fastify[method](`${base}/${name}/query`, async function(request, reply) {
      const { input } = get(request, key);
      const url = `${EXAMPLE_URL}?q=${input}`;
      const data = await sink(url);
      return data;
    });

    fastify[method](`${base}/${name}/path`, async function(request, reply) {
      const { input } = get(request, key);
      const url = `http://${input}`;
      const data = await sink(url);
      return data;
    });
  });
};
