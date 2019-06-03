const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });

module.exports = ({ router }) => {
  if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

  router.get('/multipart-form-data', (ctx, next) => {
    ctx.state.filename = '';
    return ctx.render('multipart-form-data');
  });

  router.post(
    '/multipart-form-data',
    upload.single('test_file'),
    (ctx, next) => {
      ctx.state.filename = ctx.req.file.originalname;
      return ctx.render('multipart-form-data');
    },
  );
};
