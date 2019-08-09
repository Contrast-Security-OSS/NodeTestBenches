const { get } = require('lodash');
const { routes, utils } = require('@contrast/test-bench-utils');

/**
 * @vulnerability: reflected-xss
 */
module.exports = ({ router }) => {
  const sinkData = utils.getSinkData('xss', 'koa');
  const viewData = utils.groupSinkData(sinkData);

  router.get(routes.xss.base, (ctx, next) => ctx.render('xss', { viewData }));

  sinkData.forEach(({ method, url, sink, key }) => {
    router[method](`${url}/safe`, (ctx, next) => {
      const { input } = get(ctx, key);
      ctx.body = sink(input, true);
    });

    router[method](`${url}/unsafe`, (ctx, next) => {
      const { input } = get(ctx, key);
      ctx.body = sink(input);
    });
  });
};
