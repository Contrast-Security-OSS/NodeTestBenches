const cproc = require('child_process');

/**
 * @vulnerability: command-injection
 */
module.exports = ({ router }) => {
  router.get('/command_injection', (ctx, next) => {
    return ctx.render('cmdi');
  });

  // endpoint for actual test
  router.get('/command_injection_test', async (ctx, next) => {
    const cmd = 'ls -l ' + ctx.query.user_path;
    const data = await new Promise(resolve => {
      cproc.exec(cmd, (err, data) => {
        resolve(data);
      });
    });
    ctx.body = data;
  });
};
