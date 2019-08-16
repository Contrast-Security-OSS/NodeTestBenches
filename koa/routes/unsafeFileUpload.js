const multer = require('koa-multer');
const { get } = require('lodash');
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

  sinkData.forEach(({ method, url, sink }) => {
    router[method](url, upload.single('file'), async (ctx, next) => {
      const { input } = get(ctx, 'req.body'); // multer puts it on `req`, elsewhere it's `request`
      const result = await sink(input); // doesn't really do anything
      ctx.body = result;
    });
  });
};
