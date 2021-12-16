module.exports = {
  safe: function(req, res) {
    const options = {
      httpOnly: true,
      secure: true
    };

    res.cookie('acceptable', Date.now(), options);
    res.send({ key: 'acceptable', options });
  },
  httponly: function(req, res) {
    const options = {
      httpOnly: false,
      secure: true
    };
    res.cookie('httponly', Date.now(), options);
    res.send({ key: 'httponly', options });
  },
  secureflag: function(req, res) {
    const options = {
      secure: false
    };
    res.cookie('secure-flag-missing', Date.now(), options);
    res.send({ key: 'secure-flag-missing', options });
  }
}
