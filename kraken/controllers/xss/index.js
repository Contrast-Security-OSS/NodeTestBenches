'use strict';

var XssModel = require('../../models/xss');

module.exports = function(router) {
  var model = new XssModel();

  router.get('/', function(req, res) {
    res.render('xss', model);
  });

  router.get('/unsafe', function(req, res) {
    res.send(req.query.input);
  });
};
