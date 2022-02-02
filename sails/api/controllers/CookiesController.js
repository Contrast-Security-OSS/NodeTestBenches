module.exports = {
  safe: function(req, res) {
    res.send({ key: 'acceptable', cookie: req.session.cookie });
  },
  httponly: function(req, res) {
    res.send({ key: 'httponly', cookie: req.session.cookie });
  },
  secureflag: function(req, res) {
    res.send({ key: 'secure-flag-missing', cookie: req.session.cookie  });
  }
}
