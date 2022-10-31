/* eslint-disable @typescript-eslint/no-explicit-any */

import { routes, utils } from '@contrast/test-bench-utils';
import { forEach } from 'lodash';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/*
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 *
 * @callback ResponseFn
 * @param {*}                result  return value of the sink method
 * @param {fastify.Request}  request fastify request object
 * @param {fastify.Response} reply   fastify reply object
 */

/*
 * @type {ResponseFn}
 */

const defaultRespond = (result: unknown, request: FastifyRequest, reply: FastifyReply) => {
  reply.type('text/html');
  reply.send(result);
};

/*
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object} opts
 * @param {Object} opts.locals additional locals to provide to EJS
 */

interface IFastifyInstance extends FastifyInstance {
  [index: string]: any
}

export function controllerFactory(
  vulnerability: string, { locals = {}, respond = defaultRespond } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'express');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);
  // const responsePreparer = utils.getResponsePreparer(vulnerability);

  return async function route(fastify: IFastifyInstance, options: any) {
    fastify.get(routes[vulnerability].base, async (request: FastifyRequest, reply: FastifyReply) => {
      // const { res } = reply;

      // if (responsePreparer) {
      //   responsePreparer(res);
      // }

      reply.view(vulnerability, {
        ...options,
        ...routeMeta,
        sinkData,
        groupedSinkData,
        // res,
        ...locals
      });
      return reply;
    });

    if (routeMeta.type === 'response-scanning') {
      return;
    }

    sinkData.forEach(({ method, params, url, sinks, key }) => {
      forEach(sinks, (sink, type) => {
        fastify[method](`${url}/${type}`, async (request: any, reply: any) => {
          const inputs = utils.getInput(request, key, params, { locals, noop: false });
          const result = await sink(inputs);
          respond(result, request, reply);
        });
      });
    });
  };
}
