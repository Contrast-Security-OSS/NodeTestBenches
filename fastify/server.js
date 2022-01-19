const { navRoutes } = require('@contrast/test-bench-utils');
const fastify = require('fastify');
const path = require('path');
const pem = require('pem');

const { PORT = 3000, HOST = 'localhost', SSL, HTTP2 } = process.env;
const isHttps = SSL === '1' ? true : false;
const isHttp2 = HTTP2 === '1' ? true : false;

const createServer = async () => {
  const opts = { logger: true };

  if (!isHttps && !isHttp2) return fastify(opts);

  return new Promise((resolve, reject) => {
    pem.createCertificate({ days: 1, selfSigned: true }, (err, result) => {
      if (err) return reject(err);

      opts.http2 = isHttp2;
      opts.https = {
        key: result.serviceKey,
        cert: result.certificate
      };

      return resolve(fastify(opts));
    });
  });
};

const main = async () => {
  try {
    const app = await createServer();

    app.register(require('fastify-qs'), {});
    app.register(require('fastify-formbody'));

    // setup ejs renderer
    // god damn point-of-view doesnt support layouts like every other
    // view front-end in node.
    app.register(require('point-of-view'), {
      engine: {
        ejs: require('ejs')
      },
      templates: `${__dirname}/view`,
      includeViewExtension: true // dont want to write .ejs every time
    });

    app.register(require('fastify-multipart'), { addToBody: true });
    app.register(require('fastify-cookie'));

    // shared route information
    const context = { navRoutes, currentYear: new Date().getFullYear() };

    // setup public assets
    app.register(require('fastify-static'), {
      root: path.join(__dirname, 'public'),
      prefix: '/assets/'
    });

    app.register(require('./routes/index'), context);

    // register routes for each vulnerability
    navRoutes.forEach(({ base }) => {
      app.register(require(`./routes/${base.substring(1)}`), context);
    });

    // one off routes that are not members of navroutes
    app.register(require('./routes/header-injection'), context);
    app.register(require('./routes/csp-header'), context);
    app.register(require('./routes/cookies'), context);

    await app.listen(PORT, HOST);
  } catch (err) {
    console.log(err);
  }
};

main();
