module.exports = ({ router }) => {
  router.get('/', (ctx, next) => ctx.render('index'));
};
