'use strict';
const { utils } = require('@contrast/test-bench-utils');

/**
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 *
 * @callback ResponseFn
 * @param {any} result return value of the sink method
 * @param {hapi.Request} request hapi request object
 * @param {hapi.Response} h hapi response toolkit
 */

/**
 * @type {ResponseFn}
 */
const defaultRespond = (result, request, h) => result;

/**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object} opts
 * @param {Object} opts.locals additional locals to provide to EJS
 * @param {ResponseFn} opts.respond if provided, a custom return or response
 */
module.exports = function controllerFactory(
  vulnerability,
  { locals = {}, respond = defaultRespond } = {}
) {
  return (server, options) => {
    const sinkData = utils.getSinkData(vulnerability, 'hapi');
    const groupedSinkData = utils.groupSinkData(sinkData);
    const routeMeta = utils.getRouteMeta(vulnerability);

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) =>
        h.view(vulnerability, {
          ...routeMeta,
          groupedSinkData,
          sinkData,
          ...locals
        })
    });

    sinkData.forEach(({ uri, method, sink, key }) => {
      server.route([
        {
          path: `${uri}/safe`,
          method: [method],
          handler: async (request, h) => {
            const input = utils.getInput({ locals, req: request, key });
            const result = await sink(input, { safe: true });
            return respond(result, request, h);
          }
        },
        {
          path: `${uri}/unsafe`,
          method: [method],
          handler: async (request, h) => {
            const input = utils.getInput({ locals, req: request, key });
            const result = await sink(input);
            return respond(result, request, h);
          }
        },
        {
          path: `${uri}/noop`,
          method: [method],
          handler: async (request, h) => {
            const input = 'NOOP';
            const result = await sink(input, { noop: true });
            return respond(result, request, h);
          }
        }
      ]);
    });
  };
};
