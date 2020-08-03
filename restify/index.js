'use strict';

const os = require('os');
const restify = require('restify');

const { utils, navRoutes } = require('@contrast/test-bench-utils');

const server = restify.createServer({
  formatters: {
    'application/json': restify.formatters['application/json; q=0.4'],
    'application/x-www-form-urlencoded': (req, res, data) => data,
    'text/plain': restify.formatters['text/plain; q=0.3'],
    'text/html': restify.formatters['text/plain; q=0.3']
  }
});
const { PORT = 3000 } = process.env;

const defaultRespond = (result, req, res, next) => res.send(result);
function controllerFactory(
  routeInfo,
  { locals = {}, respond = defaultRespond } = {}
) {
  let sinkData;
  const vulnerability = routeInfo.base.substr(1);

  try {
    sinkData = utils.getSinkData(vulnerability, 'restify');
  } catch (error) {
    return;
  }

  sinkData.forEach(({ method, uri, sink, key }) => {
    server[method](`${routeInfo.base}${uri}/safe`, async (req, res, next) => {
      const input = utils.getInput({ locals, req, key });
      const result = await sink(input, { safe: true });
      respond(result, req, res, next);
    });

    server[method](`${routeInfo.base}${uri}/unsafe`, async (req, res, next) => {
      const input = utils.getInput({ locals, req, key });
      const result = await sink(input);
      respond(result, req, res, next);
    });

    server[method](`${routeInfo.base}${uri}/noop`, async (req, res, next) => {
      const input = 'noop';
      const result = await sink(input, { noop: true });
      respond(result, req, res, next);
    });
  });

  return server;
}

server.use([
  restify.plugins.queryParser(),
  restify.plugins.bodyParser({
    maxBodySize: 0,
    mapParams: false,
    mapFiles: false,
    overrideParams: false,
    multipartHandler(part) {
      part.on('data', function(data) {
        // do something with the multipart data
      });
    },
    multipartFileHandler(part) {
      part.on('data', function(data) {
        // do something with the multipart file data
      });
    },
    keepExtensions: false,
    uploadDir: os.tmpdir(),
    multiples: true,
    hash: 'sha1',
    rejectUnknown: true,
    requestBodyOnGet: false,
    reviver: undefined,
    maxFieldsSize: 2 * 1024 * 1024
  }),
  require('restify-cookies').parse
]);

navRoutes.forEach((routeInfo) => {
  controllerFactory(routeInfo);
});

// random testing..
server.post('/xss/params/reflectedXss/:urlparam/unsafe', (req, res, next) => {
  res.send(req.params.urlparam);
});
server.get('/cookie-test', (req, res, next) => {
  res.setCookie('foo', 'BAR', {
    httpOnly: false,
    domain: 'www.example.com',
    maxAge: 60,
    secure: false,
    path: '/home/'
  });
});

server.listen(PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});
