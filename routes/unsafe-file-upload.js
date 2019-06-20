const path = require('path');
const multer = require('koa-multer');

const uploadPath = path.resolve(__dirname, '..', 'uploads');
const upload = multer({ dest: uploadPath });

module.exports = ({ router }) => {
  router.get('/unsafe-file-upload', (ctx, next) =>
    ctx.render('unsafe-file-upload')
  );

  router.post(
    '/unsafe-file-upload/submit',
    upload.single('test_file'),
    (ctx, next) => {
      ctx.body = ctx.req.body.test_text;
    }
  );
};
