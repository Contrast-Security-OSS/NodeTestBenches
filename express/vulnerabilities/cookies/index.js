const cookieParser = require('cookie-parser');
const api = require('express').Router();
api.use(cookieParser());

api.get('/', (req, res) => {
  res.render('../vulnerabilities/cookies/views/index');
});

api.get('/safe', (req, res) => {
  const options = {
    httpOnly: true,
    secure: true
  };

  res.cookie('acceptable', Date.now(), options);
  res.send({ key: 'acceptable', options });
});

api.get('/httponly', (req, res) => {
  const options = {
    httpOnly: false,
    secure: true
  };
  res.cookie('httponly', Date.now(), options);
  res.send({ key: 'httponly', options });
});

api.get('/secureFlagMissing', (req, res) => {
  const options = {
    secure: false
  };
  res.cookie('secure-flag-missing', Date.now(), options);
  res.send({ key: 'secure-flag-missing', options });
});

module.exports = api;
