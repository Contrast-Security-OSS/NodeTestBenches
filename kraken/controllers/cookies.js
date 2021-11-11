'use strict';

// eslint-disable-next-line node/no-extraneous-require
const cookieParser = require('cookie-parser');

module.exports = function(app) {
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.render('cookies');
  });

  app.get('/safe', (req, res) => {
    const options = {
      httpOnly: true,
      secure: true
    };

    res.cookie('acceptable', Date.now(), options);
    res.send({ key: 'acceptable', options });
  });

  app.get('/httponly', (req, res) => {
    const options = {
      httpOnly: false,
      secure: true
    };
    res.cookie('httponly', Date.now(), options);
    res.send({ key: 'httponly', options });
  });

  app.get('/secureFlagMissing', (req, res) => {
    const options = {
      secure: false
    };
    res.cookie('secure-flag-missing', Date.now(), options);
    res.send({ key: 'secure-flag-missing', options });
  });
};
