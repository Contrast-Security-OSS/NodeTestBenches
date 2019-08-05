const {
  sinks: { cmd_injection: cmdi },
  routes: {
    cmd_injection: { base: baseUri, sinks }
  },
  frameworkMapping: { koa }
} = require('@contrast/test-bench-utils');
const _ = require('lodash');

const buildUrls = (key) =>
  sinks.map((sink) => ({
    url: `${baseUri}/${key}/${_.kebabCase(sink)}`,
    sink
  }));

/**
 * @vulnerability: command-injection
 */
module.exports = ({ router }) => {
  const { method, key } = koa.query;
  const viewData = buildUrls(key);
  router.get(baseUri, (ctx, next) => ctx.render('cmdi', { viewData }));

  viewData.forEach(({ url, sink }) => {
    router[method](`${url}/unsafe`, async (ctx, next) => {
      const cmd = ctx[key].input;
      const data = await cmdi[sink](cmd);
      ctx.body = data.toString();
    });

    router[method](`${url}/safe`, async (ctx, next) => {
      // This rule has no untags so just returning untracked data
      ctx.body = 'SAFE';
    });
  });
};
