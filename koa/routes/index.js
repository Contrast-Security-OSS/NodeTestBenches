module.exports = ({ router }) => {
  router.get('/', (ctx, next) => {
    return ctx.render('index');
  });
};
