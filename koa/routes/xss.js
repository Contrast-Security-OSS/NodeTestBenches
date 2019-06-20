/**
 * @vulnerability: reflected-xss
 */
module.exports = ({ router }) => {
  router.get('/xss', (ctx, next) => ctx.render('xss'));

  [
    { method: 'get', key: 'query' },
    { method: 'get', key: 'params' },
    { method: 'get', key: 'header' },
    { method: 'post', key: 'body' }
  ].forEach(({ method, key }) => {
    let route = `/xss-test/${key}`;
    if (key === 'params') {
      route += '/:input';
    }

    router[method](route, (ctx, next) => {
      const value = (ctx.request[key] || ctx[key]).input;
      ctx.body = value;
    });

    router[method](`${route}/safe`, (ctx, next) => {
      const value = (ctx.request[key] || ctx[key]).input;
      ctx.body = encodeURIComponent(value);
    });
  });
};
