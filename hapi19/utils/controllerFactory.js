'use strict';

const { utils } = require('@contrast/test-bench-utils');
const { map } = require('lodash');

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
    const responsePreparer = utils.getResponsePreparer(vulnerability);

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        const {
          raw: { res }
        } = request;

        if (responsePreparer) {
          responsePreparer(res);
        }

        return h.view(vulnerability, {
          ...routeMeta,
          groupedSinkData,
          sinkData,
          res,
          ...locals
        });
      }
    });

    if (routeMeta.type === 'response-scanning') {
      return;
    }

    sinkData.forEach(({ uri, method, params, sinks, key }) => {
      server.route(
        map(sinks, (sink, type) => ({
          path: `${uri}/${type}`,
          method: [method],
          handler: async (request, h) => {
            const inputs = utils.getInput(request, key, params, { locals });
            const result = await sink(inputs);
            return respond(result, request, h);
          }
        }))
      );
    });
  };
};
