'use strict';
const { routes, utils } = require('@contrast/test-bench-utils');

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
  { model = {}, respond = defaultRespond } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'koa');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);

  return ({ router }) => {
    router.get(routes[vulnerability].base, (ctx, next) =>
      ctx.render(vulnerability, {
        ...routeMeta,
        sinkData,
        groupedSinkData,
        ...model
      })
    );

    sinkData.forEach(({ method, url, sink, key }) => {
      router[method](`${url}/safe`, async (ctx, next) => {
        const input = utils.getInput({ model, req: ctx, key });
        const result = await sink(input, { safe: true });
        respond(result, ctx, next);
      });

      router[method](`${url}/unsafe`, async (ctx, next) => {
        const input = utils.getInput({ model, req: ctx, key });
        const result = await sink(input);
        respond(result, ctx, next);
      });

      router[method](`${url}/noop`, async (ctx, next) => {
        const input = utils.getInput({ model, req: ctx, key });
        const result = await sink(input, { noop: true });
        respond(result, ctx, next);
      });
    });
  };
};
