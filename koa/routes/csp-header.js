/**
 * @vulnerability: csp-header-insecure
 */
module.exports = ({ router }) => {
  const unsafePolicy = [
    'default-src \'none\'',
    'font-src *',
    'img-src *',
    'media-src *',
    'script-src *',
    'style-src \'unsafe-inline\' *'
  ].join('; ');

  router.get('/csp-header', (ctx, next) => {
    ctx.set('Content-Security-Policy', unsafePolicy);
    return ctx.render('csp-header', { policy: unsafePolicy });
  });
};
