const util = require('util');

const {
  sinks,
  routes,
  frameworkMapping,
  utils
} = require('@contrast/test-bench-utils');

/**
 * @vulnerability: sql-injection
 */
module.exports = ({ router }) => {
  const { method, key } = frameworkMapping.koa.query;
  const viewData = utils.buildUrls({
    sinks: routes.sqli.sinks,
    key,
    baseUri: routes.sqli.base
  });

  router.get(routes.sqli.base, (ctx, next) => ctx.render('sqli', { viewData }));

  viewData.forEach(({ url, sink }) => {
    router[method](`${url}/safe`, async (ctx, next) => {
      const result = await sinks.sqli[sink]('clown');
      ctx.body = util.inspect(result);
    });

    router[method](`${url}/unsafe`, async (ctx, next) => {
      const result = await sinks.sqli[sink](ctx[key].input);
      ctx.body = util.inspect(result);
    });
  });
};
