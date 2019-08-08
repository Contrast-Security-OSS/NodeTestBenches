'use strict';
const {
  routes: {
    unvalidated_redirect: { base: baseUri }
  },
  frameworkMapping: { koa }
} = require('@contrast/test-bench-utils');

module.exports = ({ router }) => {
  const { method, key } = koa.query;
  router.get(baseUri, (ctx, next) =>
    ctx.render('unvalidated-redirect', { res: 'ctx', url: baseUri })
  );

  // endpoint for vuln
  router[method](`${baseUri}/unsafe`, (ctx, next) => {
    ctx.redirect(ctx[key].input);
  });

  router[method](`${baseUri}/safe`, (ctx, next) =>
    ctx.redirect(encodeURIComponent(ctx[key].input))
  );
};
