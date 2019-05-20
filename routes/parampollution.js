'use strict';
module.exports = ({ router }) => {
  router.all('/parampollution', (ctx, next) => {
    return ctx.render('parampollution');
  });

};
