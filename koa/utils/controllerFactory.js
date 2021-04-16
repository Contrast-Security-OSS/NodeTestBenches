'use strict';

const { routes, utils } = require('@contrast/test-bench-utils');
const { forEach } = require('lodash');

/**
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 *
 * @callback ResponseFn
 * @param {any} result return value of the sink method
 * @param {koa.Context} ctx koa context object
 * @param {Function} next `next` function
 */

/**
 * @type {ResponseFn}
 */
const defaultRespond = (result, ctx, next) => {
  ctx.body = result;
};

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
  const sinkData = utils.getSinkData(vulnerability, 'koa');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);
  const responsePreparer = utils.getResponsePreparer(vulnerability);

  return ({ router }) => {
    router.get(routes[vulnerability].base, (ctx, next) => {
      const {
        request: { res }
      } = ctx;
      if (responsePreparer) {
        responsePreparer(res);
      }

      return ctx.render(vulnerability, {
        ...routeMeta,
        sinkData,
        groupedSinkData,
        res,
        ...locals
      });
    });

    if (routeMeta.type === 'response-scanning') {
      return;
    }

    sinkData.forEach(({ method, params, url, sinks, key }) => {
      forEach(sinks, (sink, type) => {
        router[method](`${url}/${type}`, async (ctx, next) => {
          const inputs = utils.getInput(ctx, key, params, { locals });
          const result = await sink(inputs);
          respond(result, ctx, next);
        });
      });
    });
  };
};
