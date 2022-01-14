module.exports = {
  safe: function(req, res) {
    req.session.cookie.httpOnly = true;
    req.session.cookie.secure = true;

    res.send({ key: 'acceptable', cookie: req.session.cookie });
  },
  httponly: function(req, res) {
    req.session.cookie.httpOnly = false;
    req.session.cookie.secure = true;

    res.send({ key: 'httponly', cookie: req.session.cookie });
  },
  secureflag: function(req, res) {
    req.session.cookie.httpOnly = true;
    req.session.cookie.secure = false;

    res.send({ key: 'secure-flag-missing', cookie: req.session.cookie  });
  }
}
