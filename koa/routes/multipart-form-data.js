const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');

const uploadPath = path.resolve(__dirname, '..', 'uploads');
const upload = multer({ dest: uploadPath });

module.exports = ({ router }) => {
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

  router.get('/multipart-form-data', (ctx, next) =>
    ctx.render('multipart-form-data')
  );

  router.post(
    '/multipart-form-data/submit',
    upload.single('test_file'),
    (ctx, next) => {
      ctx.body = ctx.req.body.test_text;
    }
  );
};
