'use strict';

const { routes, utils } = require('@contrast/test-bench-utils');

/**
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 *
 * @callback ResponseFn
 * @param {*}                result  return value of the sink method
 * @param {fastify.Request}  request fastify request object
 * @param {fastify.Response} reply   fastify reply object
 */

/**
 * @type {ResponseFn}
 */
const defaultRespond = (result, request, reply) => {
  reply.type('text/html');
  reply.send(result);
};

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
  { locals = {}, respond = defaultRespond } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'express');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);
  const responsePreparer = utils.getResponsePreparer(vulnerability);

  return async function route(fastify, options) {
    fastify.get(routes[vulnerability].base, async (request, reply) => {
      let { res } = reply;

      if (responsePreparer) {
        responsePreparer(res);
      }

      reply.view(vulnerability, {
        ...options,
        ...routeMeta,
        sinkData,
        groupedSinkData,
        res,
        ...locals
      });
      return reply;
    });

    if (routeMeta.type === 'response-scanning') {
      return;
    }

    sinkData.forEach(({ method, params, url, sink, key }) => {
      fastify[method](`${url}/safe`, async (request, reply) => {
        const inputs = utils.getInput(request, key, params, { locals });
        const result = await sink(inputs, { safe: true });
        respond(result, request, reply);
      });

      fastify[method](`${url}/unsafe`, async (request, reply) => {
        const inputs = utils.getInput(request, key, params, { locals });
        const result = await sink(inputs);
        // adding this in cases where the sink returns undefined
        // fastify shits the bed in this case with a FST_ERR_PROMISE_NOT_FULLFILLED
        // i have only really seen this in ssjs where we eval('console.log("1");');
        respond(result, request, reply);
      });

      fastify[method](`${url}/noop`, async (request, reply) => {
        const inputs = utils.getInput(request, key, params, { noop: true });
        const result = await sink(inputs, { noop: true });
        respond(result, request, reply);
      });
    });
  };
};
