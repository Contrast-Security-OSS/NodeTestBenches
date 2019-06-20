/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = ({ router }) => {
  router.get('/unvalidated-redirect', (ctx, next) =>
    ctx.render('unvalidated-redirect')
  );

  // endpoint for vuln
  router.get('/unvalidated-redirect-test', (ctx, next) =>
    ctx.redirect(ctx.query.user_path)
  );

  router.get('/unvalidated-redirect-test-safe', (ctx, next) =>
    ctx.redirect(encodeURIComponent(ctx.query.user_path))
  );
};
