'use strict';
const { routes, utils } = require('@contrast/test-bench-utils');

/**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object} opts
 * @param {Object} opts.locals additional locals to provide to EJS
 */
module.exports = function controllerFactory(
  vulnerability,
  { locals = {} } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'express');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);

  return async function route(fastify, options) {
    fastify.get(routes[vulnerability].base, async (request, reply) => {
      reply.view(vulnerability, {
        ...options,
        ...routeMeta,
        sinkData,
        groupedSinkData,
        ...locals
      });
    });

    sinkData.forEach(({ method, url, sink, key }) => {
      fastify[method](`${url}/safe`, async (request, reply) => {
        const input = utils.getInput({ locals, req: request, key });
        const result = await sink(input, { safe: true });
        return result;
      });

      fastify[method](`${url}/unsafe`, async (request, reply) => {
        const input = utils.getInput({ locals, req: request, key });
        const result = await sink(input);
        return result;
      });

      fastify[method](`${url}/noop`, async (request, reply) => {
        const input = 'NOOP';
        const result = await sink(input, { noop: true });
        return result;
      });
    });
  };
};
