'use strict';

const { get } = require('lodash');

const { routes, utils } = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';
const { base } = routes.ssrf;
const sinkData = utils.getSinkData('ssrf', 'koa');
const routeMeta = utils.getRouteMeta('ssrf');

/**
 * @vulnerability: ssrf
 */
module.exports = ({ router }) => {
  router.get(base, (ctx) =>
    ctx.render('ssrf', {
      ...routeMeta,
      requestUrl: EXAMPLE_URL,
      sinkData
    })
  );

  sinkData.forEach(({ method, name, sink, key }) => {
    router[method](`${base}/${name}/query`, async function(ctx, next) {
      const { input } = get(ctx, key);
      const url = `${EXAMPLE_URL}?q=${input}`;
      const data = await sink(url);
      ctx.body = data;
    });

    router[method](`${base}/${name}/path`, async function(ctx, next) {
      const { input } = get(ctx, key);
      const url = `http://${input}`;
      const data = await sink(url);
      ctx.body = data;
    });
  });
};
