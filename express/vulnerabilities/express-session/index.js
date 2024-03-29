const session = require('express-session');
const api = require('express').Router();

api.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000, httpOnly: false, secure: false }
  })
);

api.get('/', (req, res) => {
  req.session._canary = '__@CONTRAST@__';
  res.render('../vulnerabilities/express-session/views/index');
});

// verify that the session maintained context
api.get('/xss', (req, res) => {
  if (req.session._canary) {
    res.send(req.query.input);
  } else {
    res.sendStatus(401);
  }
});

/* Cookie-parser is not supported yet. You can test it in Kraken app */

module.exports = api;
