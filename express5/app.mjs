import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import layouts from 'express-ejs-layouts';
import path from 'path';
import tbu from '@contrast/test-bench-utils';
import express from 'express'
import qs from 'qs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const { navRoutes } = tbu;

export function setup(app) {
  app.set('query parser', function(str) {
    return qs.parse(str, {
      allowPrototypes: true,
      allowDots: true
    });
  });
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