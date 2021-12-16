const { navRoutes } = require('@contrast/test-bench-utils');
const serveStatic = require('serve-static');

const locals = {
  navRoutes,
  currentYear: new Date().getFullYear()
}

const routes = [];
navRoutes.forEach(({ base }) => {
  routes.push(require(`../vulnerabilities/${base.substring(1)}`)(this.sails, locals));
});

const flattened = routes.reduce(function(flattened, current) {
  return Object.assign(flattened, current);
}, {});

module.exports.routes = {
  'GET /assets/*' : {
    skipAssets: false,
    fn: serveStatic(require('path').resolve('__dirname', '../', 'public'))
  },
  'GET /': { view: 'index', locals },
  'GET /typecheck': 'typecheck',
  'GET /header-injection': { view: 'header-injection', locals },
  'GET /header-injection/inject': { action: 'header-injection' },
  'GET /cookies' : { view: 'cookies', locals },
  'GET /cookies/safe' : { controller: 'Cookies', action: 'safe' },
  'GET /cookies/httponly' : { controller: 'Cookies', action: 'httponly' },
  'GET /cookies/secureFlagMissing' : { controller: 'Cookies', action: 'secureflag' },
  ...flattened,
  'GET /quit': function(req, res) {
    process.exit();
  }
}
