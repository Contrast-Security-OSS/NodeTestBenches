const fs = require('fs');
/**
 * @vulnerabiility: path-traversal
 */
module.exports = ({ router }) => {
  router.get('/path-traversal', (ctx, next) => {
    return ctx.render('path-traversal');
  });

  router.post('/path-traversal-test', async (ctx, next) => {
    let path = ctx.request.body.user_path;
    const data = await new Promise(resolve => {
      fs.readFile(path, (err, data) => {
        resolve(data);
      });
    });
    ctx.body = data.toString();
  });
};
