/**
 * @vulnerability: unvalidated-redirect
 */
module.exports = ({ router }) => {
  router.get('/unvalidated-redirect', (ctx, next) => {
    return ctx.render('unvalidated-redirect');
  });

  // endpoint for vuln
  router.get('/unvalidated-redirect-test', (ctx, next) => {
    return ctx.redirect(ctx.query.user_path);
  });
  router.post('/unvalidated-redirect/post', (ctx, next) => {
    return ctx.redirect(ctx.request.body.user_path);
  });
};
