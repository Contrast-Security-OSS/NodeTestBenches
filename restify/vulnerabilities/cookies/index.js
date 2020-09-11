'use strict';

const { Router } = require('restify-router');
const path = require('path');

const router = new Router();

router.get('/', (req, res) => {
  res.render(path.resolve(__dirname, 'views', 'index'), {});
});

router.get('/safe', (req, res) => {
  const options = {
    path: req.getPath(),
    maxAge: 60,
    secure: true,
  };
  res.setCookie('acceptable', Date.now(), options);
  res.send({ key: 'acceptable', options });
});

router.get('/httponly', (req, res) => {
  const options = {
    path: req.getPath(),
    maxAge: 60,
    httpOnly: false,
    secure: true,
  };
  res.setCookie('httponly', Date.now(), options);
  res.send({ key: 'httponly', options });
});

router.get('/secureFlagMissing', (req, res) => {
  const options = {
    path: req.getPath(),
    maxAge: 60,
    secure: false,
  };
  res.setCookie('secure-flag-missing', Date.now(), options);
  res.send({ key: 'secure-flag-missing', options });
});

module.exports = router;
