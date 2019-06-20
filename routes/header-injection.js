/**
 * @vulnerability: header-injection
 */
module.exports = ({ router }) => {
  router.get('/header-injection', (ctx, next) =>
    ctx.render('header-injection')
  );

  // vuln
  router.get('/header-injection/inject', (ctx, next) => {
    const path = ctx.query.user_path;
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    ctx.set('Pragma', 'no-cache');
    ctx.set('Expires', 0);

    ctx.set('INJECTED', path);
    ctx.body = `Injected header  ${path}`;
  });
};
