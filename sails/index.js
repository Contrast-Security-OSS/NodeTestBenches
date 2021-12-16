'use strict';

const start = Date.now();
const sails = require('sails');
// TODO: Config Sails for HTTPS / HTTP2

const config = require('./app').setup(sails);

// Start server
sails.lift(config, function (err) {
  if (err) {
    console.log('Error occurred lifting Sails app:', err);
    return;
  }

  const stop = Date.now();
  /* eslint-disable no-console */
  console.log(`startup time: ${stop - start}`);
});
