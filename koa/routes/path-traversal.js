'use strict';
const { get } = require('lodash');

const {
  sinks: { path_traversal: fs },
  routes: {
    path_traversal: { base: baseUri, sinks }
  },
  frameworkMapping: { koa },
  utils: { buildUrls }
} = require('@contrast/test-bench-utils');

module.exports = ({ router }) => {
  const { method, key } = koa.query;
  const viewData = buildUrls({ sinks, key, baseUri });
  router.get(baseUri, (ctx, next) =>
    ctx.render('path-traversal', { viewData })
  );

  viewData.forEach(({ url, sink }) => {
    router[method](`${url}/no-op`, (ctx, res) => {
      ctx.body = 'PROBE';
    });

    router[method](`${url}/safe`, async (ctx, res) => {
      const path = encodeURIComponent(get(ctx, key).input);
      const data = await fs[sink](path, true);
      ctx.body = data.toString();
    });

    router[method](`${url}/unsafe`, async (ctx, res) => {
      const path = get(ctx, key).input;
      const data = await fs[sink](path);
      ctx.body = data.toString();
    });
  });
};
