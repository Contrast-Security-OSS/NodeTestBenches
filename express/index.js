'use strict';
if (process.env.CONTRAST_NEW_RELIC_KEY) {
  require('newrelic');
}

const start = Date.now();
const express = require('express');
/**
 * This allows use to naively handle
 * async controller requests without
 * a catch handler that calls next
 *
 * Instead of:
 * try {
 *   const data = await asyncCall();
 *   res.send(data.toString());
 * } catch(err) {
 *   next(err);
 * }
 *
 * We can do:
 *
 * const data = await asyncCall();
 * res.send(data.toString());
 *
 */
require('express-async-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const https = require('https');
const pem = require('pem');
const path = require('path');

const app = express();
const { PORT = 3000, HOST = 'localhost', SSL, CLUSTER } = process.env;
const isHttps = SSL === '1' ? true : false;
require('./app').setup(app);

const listener = function listener() {
  const { address, port } = this.address();
  const protocol = isHttps ? 'https' : 'http';
  const stop = Date.now();
  /* eslint-disable no-console */
  console.log(`startup time: ${stop - start}`);
  console.log('Server listening on %s://%s:%d', protocol, address, port);
};

function createServer() {
  /* Start Server based on protocol */
  isHttps
    ? pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
        if (err) {
          throw err;
        }
        https
          .createServer({ key: keys.serviceKey, cert: keys.certificate }, app)
          .listen(PORT, HOST, listener);
      })
    : http.createServer(app).listen(PORT, HOST, listener);
}

if (CLUSTER) {
  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    createServer();
  }
} else {
  createServer();
}
