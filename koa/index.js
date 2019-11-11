const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const cookieParser = require('koa-cookie');
const { navRoutes } = require('@contrast/test-bench-utils');

const { PORT = 3000, HOST = 'localhost' } = process.env;

// setup static file serving
app.use(mount('/assets', serve('./public')));

// setup the ejs renderer
render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  async: false
});

// adding current year to be used in layout for copyright year
app.use((ctx, next) => {
  ctx.state = ctx.state || {};
  ctx.state.navRoutes = navRoutes;
  ctx.state.currentYear = new Date().getFullYear();
  return next();
});

app.use(bodyParser());
app.use(cookieParser.default());

require('./routes/index')({ router });

// dynamically register routes from shared config
navRoutes.forEach(({ base }) => {
  require(`./routes/${base.substring(1)}`)({ router });
});

// one offs that need to eventually be removed
require('./routes/csp-header')({ router });
require('./routes/header-injection')({ router });
require('./routes/parampollution')({ router });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, HOST, function listener() {
  const { address, port } = this.address();
  // eslint-disable-next-line no-console
  console.log('Server listening on http://%s:%d', address, port);
});
