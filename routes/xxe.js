'use strict';
const {
  sinks: { xxe },
  routes: {
    xxe: { base: baseUri, sinks }
  },
  frameworkMapping: { koa },
  utils: { attackXml }
} = require('@contrast/test-bench-utils');

module.exports = ({ router }) => {
  const { method } = koa.body;
  router.get('/xxe', (ctx, next) =>
    ctx.render('xxe', {
      attackXml,
      url: baseUri
    })
  );
  sinks.forEach((sink) => {
    router[method](`${baseUri}/safe`, (ctx, next) => {
      const data = xxe[sink](attackXml, true);
      ctx.body = data.toString();
    });

    router[method](`${baseUri}/unsafe`, (ctx, next) => {
      const data = xxe[sink](attackXml);
      ctx.body = data.toString();
    });
  });
};
