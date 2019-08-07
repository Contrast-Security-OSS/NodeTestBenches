const path = require('path');
const multer = require('koa-multer');
const uploadPath = path.resolve(__dirname, '..', 'uploads');
const upload = multer({ dest: uploadPath });
const {
  routes: {
    unsafe_file_upload: { base: baseUri }
  },
  frameworkMapping: { koa }
} = require('@contrast/test-bench-utils');

module.exports = ({ router }) => {
  const { method, key } = koa.body;
  router.get(baseUri, (ctx, next) =>
    ctx.render('unsafe-file-upload', {
      uri: baseUri
    })
  );

  router[method](`${baseUri}/submit`, upload.single('file'), (ctx, next) => {
    ctx.body = ctx.req[key].input;
  });
};
