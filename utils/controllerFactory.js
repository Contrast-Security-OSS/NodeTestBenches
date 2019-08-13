'use strict';

const { get } = require('lodash');

const { routes, utils } = require('@contrast/test-bench-utils');

module.exports = function controllerFactory(vulnerability) {
  return ({ router }) => {
    const viewData = utils.getViewData(vulnerability, 'koa');

    router.get(routes[vulnerability].base, (ctx, next) =>
      ctx.render(vulnerability, { viewData })
    );

    viewData.forEach(({ method, url, sink, key }) => {
      router[method](`${url}/safe`, async (ctx, next) => {
        const { input } = get(ctx, key);
        const result = await sink(input, { safe: true });
        ctx.body = result;
      });

      router[method](`${url}/unsafe`, async (ctx, next) => {
        const { input } = get(ctx, key);
        const result = await sink(input);
        ctx.body = result;
      });

      router[method](`${url}/noop`, async (ctx, next) => {
        const { input } = get(ctx, key);
        const result = await sink(input, { noop: true });
        ctx.body = result;
      });
    });
  };
};
