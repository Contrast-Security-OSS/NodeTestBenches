const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require("koa-mount");
const bodyParser = require('koa-bodyparser');

const PORT = process.env.PORT || 3000;

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

// adding current year to be used in layout for copyright year
app.use((ctx, next) => {
  ctx.state = ctx.state || {};
  ctx.state.currentYear = new Date().getFullYear()
  return next();
});

app.use(bodyParser());

require('./routes/index')({ router });
require('./routes/xss')({ router });
require('./routes/cmdi')({ router });
require('./routes/sqli')({ router });
require('./routes/unvalidated-redirect')({ router });
require('./routes/path-traversal')({ router });
require('./routes/ssjs')({ router });
require('./routes/header-injection')({ router });
require('./routes/csp-header')({ router });
require('./routes/xxe')({ router });


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
