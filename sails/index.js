'use strict';

const start = Date.now();
const sails = require('sails');

function logServerStart(err) {
  if (err) {
    console.log('Error occurred lifting Sails app:', err);
    return;
  }

  const stop = Date.now();
  /* eslint-disable no-console */
  console.log(`startup time: ${stop - start}`);
}

require('./app').setup(sails, function(err, config) {
  sails.lift(config, logServerStart);
});

