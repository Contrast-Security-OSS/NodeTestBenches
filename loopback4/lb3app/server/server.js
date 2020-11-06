// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const layouts = require('express-ejs-layouts');
const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');
const {
  navRoutes,
} = require('@contrast/loopback-test-bench/node_modules/@contrast/test-bench-utils');

const app = (module.exports = loopback());

app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(
    __dirname,
    '../../node_modules/@contrast/loopback-test-bench/server/views',
  ),
);
app.use(layouts);

app.locals.currentYear = new Date().getFullYear();
app.locals.navRoutes = navRoutes;

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
const bootDir = path.join(
  __dirname,
  '../../node_modules/@contrast/loopback-test-bench/server',
);
boot(app, bootDir, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
