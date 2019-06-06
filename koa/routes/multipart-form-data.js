const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });

module.exports = ({ router }) => {
  if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

  router.get('/multipart-form-data', (ctx, next) => {
    return ctx.render('multipart-form-data');
  });

  router.post(
    '/multipart-form-data/submit',
    upload.single('test_file'),
    (ctx, next) => {
      ctx.body = ctx.req.body.test_text;
    },
  );
};
