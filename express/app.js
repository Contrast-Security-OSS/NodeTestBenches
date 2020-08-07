const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const layouts = require('express-ejs-layouts');
const path = require('path');
const { navRoutes } = require('@contrast/test-bench-utils');
const express = require('express');

module.exports.setup = function(app) {
  require('./vulnerabilities/static');
  app.use('/assets', express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.json({ limit: '50mb', extended: true }));
  app.use(cookieParser('keyboard cat'));

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'ejs');
  app.use(layouts);

  // dynamically register routes from shared config
  navRoutes.forEach(({ base }) => {
    app.use(base, require(`./vulnerabilities/${base.substring(1)}`));
  });
  app.use('/header-injection', require('./vulnerabilities/header-injection'));
  app.use(
    '/csp-header-insecure',
    require('./vulnerabilities/csp-header-insecure')
  );
  app.use('/typecheck', require('./vulnerabilities/typecheck'));
  app.use('/express-session', require('./vulnerabilities/express-session'));

  // adding current year for footer to be up to date
  app.locals.navRoutes = navRoutes;
  app.locals.currentYear = new Date().getFullYear();

  app.get('/', function(req, res) {
    res.render('pages/index');
  });

  app.get('/quit', function(req, res) {
    res.send('adieu, cherie');
    process.exit(); // eslint-disable-line
  });
};
