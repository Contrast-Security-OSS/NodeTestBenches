'use strict';

const glue = require('@hapi/glue');
const path = require('path');
const pem = require('pem');
const { navRoutes } = require('@contrast/test-bench-utils');

const { PORT = 3000, HOST = 'localhost', SSL } = process.env;
const isHttps = SSL === 1;

const manifest = {
  server: {
    debug: { request: ['error', 'uncaught'] },
    port: PORT,
    host: HOST
  },
  register: {
    plugins: [
      // hapi plugins
      { plugin: '@hapi/inert' },
      { plugin: '@hapi/vision' },

      // DB initializer
      { plugin: './db/mongodb.js' },

      // one-off route handlers
      { plugin: './routes/index.js' },
      {
        plugin: './routes/mongo-injection',
        routes: { prefix: '/mongoinjection' }
      },
      {
        plugin: './routes/header-injection',
        routes: { prefix: '/header-injection' }
      },
      {
        plugin: './routes/session/http-only.js',
        routes: { prefix: '/session/httponly' }
      },
      {
        plugin: './routes/session/secure-flag-missing.js',
        routes: { prefix: '/session/secureflagmissing' }
      }
    ]
  }
};

// dynamically register routes from our shared utils config
navRoutes.forEach((route) => {
  manifest.register.plugins.push({
    plugin: `./routes/${route.base.substring(1)}`,
    routes: { prefix: route.base }
  });
});

const options = {
  relativeTo: __dirname
};

if (isHttps) {
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
        navRoutes
      }
    });
    await server.start();
    console.log(
      'Server listening on %s://%s:%d',
      isHttps ? 'https' : 'http',
      HOST,
      PORT
    );
  } catch (err) {
    console.error(err); // eslint-disable-line
    process.exit(1); // eslint-disable-line
  }
}
