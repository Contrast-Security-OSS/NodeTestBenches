'use strict';

const path = require('path');
const restify = require('restify');
const { Router } = require('restify-router');
const { navRoutes } = require('@contrast/test-bench-utils');

const server = restify.createServer({
  ignoreTrailingSlash: true,
  formatters: {
    'application/json': restify.formatters['application/json; q=0.4'],
    'application/x-www-form-urlencoded': (req, res, data) => data,
    'text/plain': restify.formatters['text/plain; q=0.3'],
    'text/html': restify.formatters['text/plain; q=0.3'],
  },
});
const { PORT = 3000, HOST = 'localhost' } = process.env;

const uploadDir = path.resolve(
  __dirname,
  './vulnerabilities/unsafeFileUpload/uploads'
);

server.use([
  restify.plugins.queryParser({ allowDots: true }),
  restify.plugins.bodyParser({
    hash: 'sha1',
    rejectUnknown: true,
    maxFieldsSize: 2 * 1024 * 1024,
    uploadDir,
  }),
  require('restify-cookies').parse,
  require('./utils/ejs'),
]);

const router = new Router();
navRoutes.forEach(({ base }) => {
  router.add(base, require(`./vulnerabilities/${base.substring(1)}`));
});
// misc routes
router.add('/cookies', require('./vulnerabilities/cookies'));
router.applyRoutes(server);

server.get('/', function (req, res) {
  res.render(path.resolve(__dirname, 'views', 'pages', 'index'), {
    locals: {},
  });
});

server.get('/assets/*', restify.plugins.serveStatic({ directory: __dirname }));

// random testing..
server.post('/xss/params/reflectedXss/:urlparam/unsafe', (req, res, next) => {
  res.send(req.params.urlparam);
});

server.listen(PORT, HOST, function () {
  // eslint-disable-next-line
  console.log('%s listening at %s', server.name, server.url);
});
