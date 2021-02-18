'use strict';

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
const layouts = require('express-ejs-layouts');
const kraken = require('kraken-js');
const { navRoutes } = require('@contrast/test-bench-utils');

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
const options = {
  onconfig(config, next) {
    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */
    next(null, config);
  },
  onKrakenMount(app, options) {
    app.use('/foo', (req, res) => {
      res.send('hi!');
    });
    app.on('start', function() {
      console.log('Application ready to serve requests.');
      console.log('Environment: %s', app.kraken.get('env:env'));
    });
  }
};

const app = (module.exports = express());
app.locals.navRoutes = navRoutes;
app.locals.currentYear = new Date().getFullYear();
app.use(layouts);
app.use(kraken(options));
