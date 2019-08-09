'use strict';

const { get } = require('lodash');

const {
  routes: {
    ssrf: { base, sinks }
  },
  frameworkMapping: { koa },
  sinks: { ssrf }
} = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

module.exports = ({ router }) => {
  const { method, key } = koa.query;
  router.get(base, (ctx) =>
    ctx.render('ssrf', {
      requestUrl: EXAMPLE_URL
    })
  );

  sinks.forEach((sink) => {
    const lib = sink.toLowerCase();
    router[method](`${base}/${lib}/query`, async function(ctx, next) {
      const url = `${EXAMPLE_URL}?q=${get(ctx, key).input}`;
      const data = await ssrf[`make${sink}Request`](url);
      ctx.body = data;
    });

    router[method](`${base}/${lib}/path`, async function(ctx, next) {
      const url = `http://${get(ctx, key).input}`;
      const data = await ssrf[`make${sink}Request`](url);
      ctx.body = data;
    });
  });
};
