'use strict';

const glue = require('@hapi/glue');
const path = require('path');
const pem = require('pem');
const {
  routes: {
    cmdInjection,
    pathTraversal,
    sqlInjection,
    ssjs,
    ssrf,
    unsafeFileUpload,
    unvalidatedRedirect,
    xss,
    xxe
  },
  utils
} = require('@contrast/test-bench-utils');

const PORT = process.env.PORT || 3000;

const manifest = {
  server: {
    debug: { request: ['error', 'uncaught'] },
    port: PORT
  },
  register: {
    plugins: [
      // hapi plugins
      { plugin: '@hapi/inert' },
      { plugin: '@hapi/vision' },

      // DB initializers
      { plugin: './db/mongodb.js' },
      { plugin: './db/mysql.js' },

      // route handlers
      { plugin: './routes/index.js' },
      {
        plugin: './routes/cmdInjection',
        routes: { prefix: cmdInjection.base }
      },
      {
        plugin: './routes/header-injection',
        routes: { prefix: '/header-injection' }
      },
      {
        plugin: './routes/mongo-injection/',
        routes: { prefix: '/mongoinjection' }
      },
      {
        plugin: './routes/pathTraversal',
        routes: { prefix: pathTraversal.base }
      },
      {
        plugin: './routes/session/http-only.js',
        routes: { prefix: '/session/httponly' }
      },
      {
        plugin: './routes/session/secure-flag-missing.js',
        routes: { prefix: '/session/secureflagmissing' }
      },
      {
        plugin: './routes/sqlInjection/',
        routes: { prefix: sqlInjection.base }
      },
      {
        plugin: './routes/ssjs',
        routes: { prefix: ssjs.base }
      },
      {
        plugin: './routes/ssrf',
        routes: { prefix: ssrf.base }
      },
      {
        plugin: './routes/unsafeFileUpload',
        routes: { prefix: unsafeFileUpload.base }
      },
      {
        plugin: './routes/unvalidatedRedirect',
        routes: { prefix: unvalidatedRedirect.base }
      },
      {
        plugin: './routes/xss/',
        routes: { prefix: xss.base }
      },
      {
        plugin: './routes/xxe',
        routes: { prefix: xxe.base }
      }
    ]
  }
};

const options = {
  relativeTo: __dirname
};

if (process.env.SSL === '1') {
  pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
    manifest.connections[0].tls = {
      key: keys.serviceKey,
      cert: keys.certificate
    };
    start();
  });
} else {
  start();
}

async function start() {
  try {
    const server = await glue.compose(
      manifest,
      options
    );
    server.views({
      engines: { ejs: require('ejs') },
      allowAbsolutePaths: true,
      relativeTo: path.resolve(__dirname, 'views'),
      path: 'pages',
      layout: true,
      context: {
        currentYear: new Date().getFullYear(),
        navRoutes: utils.navRoutes
      }
    });
    await server.start();
    console.log(
      'Server listening on %s://localhost:%d',
      process.env.SSL === '1' ? 'https' : 'http',
      PORT
    );
  } catch (err) {
    console.error(err); // eslint-disable-line
    process.exit(1); // eslint-disable-line
  }
}
