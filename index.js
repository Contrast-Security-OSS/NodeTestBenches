const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require("koa-mount");
const bodyParser = require('koa-bodyparser');

const PORT = process.env.CONTRAST_PORT || 3000;

// setup static file serving
app.use(mount("/assets", serve("./public")));

// setup the ejs renderer
render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  async: false
});

app.use(bodyParser());

require('./routes/index')({ router });
require('./routes/xss')({ router });
require('./routes/cmdi')({ router });
require('./routes/sqli')({ router });
require('./routes/unvalidated_redirect')({ router });
require('./routes/path_traversal')({ router });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
