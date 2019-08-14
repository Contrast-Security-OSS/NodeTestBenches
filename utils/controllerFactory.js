'use strict';

const { get } = require('lodash');

const { routes, utils } = require('@contrast/test-bench-utils');

const defaultRespond = (result, ctx) => {
  ctx.body = result;
};

/**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object} opts
 * @param {Object} opts.locals additional locals to provide to EJS
 * @param {Function} opts.respond if provided, a custom return or response
 */
module.exports = function controllerFactory(
  vulnerability,
  { locals = {}, respond = defaultRespond } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'koa');
  const groupedSinkData = utils.groupSinkData(sinkData);

  return ({ router }) => {
    router.get(routes[vulnerability].base, (ctx, next) =>
      ctx.render(vulnerability, { sinkData, groupedSinkData, ...locals })
    );

    sinkData.forEach(({ method, url, sink, key }) => {
      router[method](`${url}/safe`, async (ctx, next) => {
        const { input } = get(ctx, key);
        const result = await sink(input, { safe: true });
        respond(result, ctx);
      });

      router[method](`${url}/unsafe`, async (ctx, next) => {
        const { input } = get(ctx, key);
        const result = await sink(input);
        respond(result, ctx);
      });

      router[method](`${url}/noop`, async (ctx, next) => {
        const { input } = get(ctx, key);
        const result = await sink(input, { noop: true });
        respond(result, ctx);
      });
    });
  };
};
