'use strict';

const app = require('./index');
const http = require('http');

const { PORT = 3000, HOST = 'localhost' } = process.env;

/*
 * Create and start HTTP server.
 */

const server = http.createServer(app);
server.listen(PORT, HOST);
server.on('listening', function listener() {
  const { address, port } = this.address();
  console.log('Server listening on http://%s:%d', address, port);
});
