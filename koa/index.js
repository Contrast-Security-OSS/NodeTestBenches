const path = require('path');

const Koa = require('koa');
const Router = process.env.LEGACY_ROUTER
  ? require('koa-router')
  : require('@koa/router');
const app = new Koa();
const router = new Router();
const http2 = require('http2');
const pem = require('pem');
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const cookieParser = require('koa-cookie');
const { navRoutes } = require('@contrast/test-bench-utils');

const { PORT = 3000, HOST = 'localhost', HTTP2 } = process.env;
const isHttp2 = HTTP2 === '1' ? true : false;
// setup static file serving
app.use(mount('/assets', serve(`${__dirname}/public`)));

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
require('./routes/cookies')({ router });

// dynamically register routes from shared config
navRoutes.forEach(({ base }) => {
  require(`./routes/${base.substring(1)}`)({ router });
});

app.use(router.routes());
app.use(router.allowedMethods());

function listener() {
  const { address, port } = this.address();
  const protocol = isHttp2 ? 'https' : 'http';
  // eslint-disable-next-line no-console
  console.log('Server listening on %s://%s:%d', protocol, address, port);
}

function createServer() {
  if (!isHttp2) {
    app.listen(PORT, HOST, listener);
  } else {
    pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
      if (err) {
        throw err;
      }
      const options = { key: keys.serviceKey, cert: keys.certificate };
      http2
        .createSecureServer(options, app.callback())
        .listen(PORT, HOST, listener);
    });
  }
}

createServer();
