'use strict';

const glue = require('@hapi/glue');
const path = require('path');
const pem = require('pem');
const {
  routes: {
    cmd_injection,
    path_traversal,
    ssrf,
    ssjs,
    unsafe_file_upload,
    unvalidated_redirect,
    xxe
  }
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
        plugin: './routes/ssrf',
        routes: { prefix: ssrf.base }
      },
      {
        plugin: './routes/mongo-injection/',
        routes: { prefix: '/mongoinjection' }
      },
      {
        plugin: './routes/reflected-xss/',
        routes: { prefix: '/reflectedxss' }
      },
      {
        plugin: './routes/reflected-xss/object-sources/',
        routes: { prefix: '/reflectedxss/objects' }
      },
      {
        plugin: './routes/cmd-injection',
        routes: { prefix: cmd_injection.base }
      },
      {
        plugin: './routes/ssjs-injection',
        routes: { prefix: ssjs.base }
      },
      {
        plugin: './routes/sql-injection/',
        routes: { prefix: '/sqlinjection' }
      },
      {
        plugin: './routes/unsafe-eval',
        routes: { prefix: '/unsafe_eval' }
      },
      {
        plugin: './routes/header-injection',
        routes: { prefix: '/header-injection' }
      },
      {
        plugin: './routes/unvalidated-redirect',
        routes: { prefix: unvalidated_redirect.base }
      },
      {
        plugin: './routes/path-traversal',
        routes: { prefix: path_traversal.base }
      },
      {
        plugin: './routes/unsafe-file-upload',
        routes: { prefix: unsafe_file_upload.base }
      },
      {
        plugin: './routes/xxe',
        routes: { prefix: xxe.base }
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
      partialsPath: 'partials'
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
  } catch (err) {
    console.error(err); // eslint-disable-line
    process.exit(1); // eslint-disable-line
  }
}
