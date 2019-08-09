'use strict';
const { get } = require('lodash');

const {
  sinks: { cmd_injection: cmdi },
  routes: {
    cmd_injection: { base: baseUri, sinks }
  },
  frameworkMapping: { koa },
  utils: { buildUrls }
} = require('@contrast/test-bench-utils');

/**
 * @vulnerability: command-injection
 */
module.exports = ({ router }) => {
  const { method, key } = koa.query;
  const viewData = buildUrls({ sinks, key, baseUri });
  router.get(baseUri, (ctx, next) => ctx.render('cmdi', { viewData }));

  viewData.forEach(({ url, sink }) => {
    router[method](`${url}/unsafe`, async (ctx, next) => {
      const cmd = get(ctx, key).input;
      const data = await cmdi[sink](cmd);
      ctx.body = data.toString();
    });

    router[method](`${url}/safe`, (ctx, next) => {
      // This rule has no untags so just returning untracked data
      ctx.body = 'SAFE';
    });
  });
};
