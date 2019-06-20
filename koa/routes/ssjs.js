/**
 * @vulnerability: ssjs-injection
 */
module.exports = ({ router }) => {
  router.get('/ssjs', (ctx, next) => ctx.render('ssjs'));

  // vulns
  router.get('/ssjs/eval', (ctx, next) => {
    const code = ctx.query.user_data;
    ctx.body = eval(code || '');
  });
};
