module.exports = ({ router }) => {
  router.use((ctx, next) => {
    // This is a work-around for the Internal Server Error:
    // "Error: Cannot send secure cookie over unencrypted connection"
    ctx.cookies.secure = true;
    return next();
  });

  router.get('/cookies', (ctx, next) => ctx.render('cookies'));

  router.get('/cookies/safe', (ctx, next) => {
    const options = {
      httpOnly: false,
      secure: true
    };

    ctx.cookies.set('acceptable', Date.now(), options);
    ctx.body = { key: 'acceptable', options };

    return next();
  });

  router.get('/cookies/httponly', (ctx, next) => {
    const options = {
      httpOnly: false,
      secure: true
    };
    ctx.cookies.set('httponly', Date.now(), options);
    ctx.body = { key: 'httponly', options };
  });

  router.get('/cookies/secureFlagMissing', (ctx, next) => {
    const options = {
      secure: false
    };
    ctx.cookies.set('secure-flag-missing', Date.now(), options);
    ctx.body = { key: 'secure-flag-missing', options };
  });
};
