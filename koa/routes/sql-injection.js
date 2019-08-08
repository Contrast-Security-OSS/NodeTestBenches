const util = require('util');

const { routes, utils } = require('@contrast/test-bench-utils');

/**
 * @vulnerability: sql-injection
 */
module.exports = ({ router }) => {
  const viewData = utils.getViewData('sql_injection', 'koa');

  router.get(routes.sql_injection.base, (ctx, next) =>
    ctx.render('sql-injection', { viewData })
  );

  viewData.forEach(({ method, url, sink, key }) => {
    router[method](`${url}/safe`, async (ctx, next) => {
      const result = await sink('clown');
      ctx.body = util.inspect(result);
    });

    router[method](`${url}/unsafe`, async (ctx, next) => {
      const result = await sink(ctx[key].input);
      ctx.body = util.inspect(result);
    });
  });
};
