'use strict';
const { get } = require('lodash');

const {
  sinks: { ssjs },
  routes: {
    ssjs: { base: baseUri, sinks }
  },
  frameworkMapping: { koa },
  utils: { buildUrls }
} = require('@contrast/test-bench-utils');

module.exports = ({ router }) => {
  const { method, key } = koa.query;
  const viewData = buildUrls({ sinks, key, baseUri });
  router.get(baseUri, (ctx, next) => ctx.render('ssjs', { viewData }));

  viewData.forEach(({ url, sink }) => {
    router[method](`${url}/unsafe`, async (ctx, next) => {
      const cmd = get(ctx, key).input;
      const data = await ssjs[sink](cmd);
      ctx.body = data.toString();
    });

    router[method](`${url}/safe`, (ctx, next) => {
      // This rule has no untags so just returning untracked data
      ctx.body = 'SAFE';
    });
  });
};
