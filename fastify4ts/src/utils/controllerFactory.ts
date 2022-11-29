import { routes, utils } from '@contrast/test-bench-utils';
import { forEach } from 'lodash';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

interface Respond {
  (result: unknown, request: FastifyRequest, reply: FastifyReply): void;
}
interface FactoryOptions {
  locals?: Record<string, any>, respond?: Respond
}

/**
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 */
const defaultRespond: Respond = (result, request, reply) => {
  reply.type('text/html');
  reply.send(result);
};

/**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 */
export function controllerFactory(
  vulnerability: string, { locals = {}, respond = defaultRespond }: FactoryOptions = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'express');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);
  const responsePreparer = utils.getResponsePreparer(vulnerability);

  return async function route(fastify: FastifyInstance, options: any) {
    fastify.get(routes[vulnerability].base, async (request, reply) => {
      let raw: unknown;

      if (responsePreparer) {
        raw = reply.raw;
      }

      reply.view(vulnerability, {
        ...options,
        ...routeMeta,
        sinkData,
        groupedSinkData,
        raw,
        ...locals
      });
      return reply;
    });

    if (routeMeta.type === 'response-scanning') {
      return;
    }

    sinkData.forEach(({ method, params, url, sinks, key }) => {
      forEach(sinks, (sink, type) => {
        fastify[method](`${url}/${type}`, async (request, reply) => {
          const inputs = utils.getInput(request as any, key, params, { locals, noop: false });
          const result = await sink(inputs);
          respond(result, request, reply);
        });
      });
    });
  };
}
