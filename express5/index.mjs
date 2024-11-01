'use strict';
import { createRequire } from 'module';
import http from 'http';
import https from 'https';
import pem from 'pem';
import cluster from 'cluster';
import os from 'os';
import express from 'express';
const require = createRequire(import.meta.url);

if (process.env.CONTRAST_NEW_RELIC_KEY) {
  require('newrelic');
}

const start = Date.now();
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
const app = express();
const { PORT = 3000, HOST = 'localhost', SSL, CLUSTER } = process.env;
const isHttps = SSL === '1' ? true : false;
import { setup } from './app.mjs';
setup(app);

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
  const numCPUs = os.cpus().length;

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