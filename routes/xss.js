/**
 * @vulnerability: reflected-xss
 */
module.exports = ({ router }) => {
  router.get('/xss', (ctx, next) => {
    return ctx.render('xss');
  });
  // query param XSS
  router.get('/xss_test', (ctx, next) => {
    ctx.body = ctx.query.input;
  });
};
