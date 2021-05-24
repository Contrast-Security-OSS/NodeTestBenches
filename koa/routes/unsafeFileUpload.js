const multer = require('koa-multer');
const path = require('path');

const { routes, utils } = require('@contrast/test-bench-utils');

const dest = path.resolve(__dirname, '..', 'uploads');
const upload = multer({ dest });
const sinkData = utils.getSinkData('unsafeFileUpload', 'koa');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

/**
 * @vulnerability: unsafe-file-upload
 */
module.exports = ({ router }) => {
  router.get(routes.unsafeFileUpload.base, (ctx, next) =>
    ctx.render('unsafeFileUpload', {
      ...routeMeta,
      sinkData
    })
  );

  sinkData.forEach(({ method, params, url, sinks }) => {
    router[method](url, upload.single('file'), async (ctx, next) => {
      const inputs = utils.getInput(ctx, 'req.body', params); // multer puts it on `req`, elsewhere it's `request`
      const result = await sinks.unsafe(inputs); // doesn't really do anything
      ctx.body = result;
    });
  });
};
