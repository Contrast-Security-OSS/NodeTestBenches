'use strict';
module.exports = ({ router }) => {
  router.all('/parampollution', (ctx, next) => ctx.render('parampollution'));
};
