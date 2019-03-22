/**
 * @vulnerability: ssjs-injection
 */
module.exports = ({ router }) => {
  router.get('/ssjs', (ctx, next) => {
    return ctx.render('ssjs');
  });

  // vulns
  router.get('/ssjs/eval', (ctx, next) => {
    const code = ctx.query.user_data;
    ctx.body = eval(code);
  });

  router.get('/ssjs/function', (ctx, next) => {
    const code = ctx.query.user_data;
    ctx.body = Function(code)();
  });
};
