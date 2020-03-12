'use strict';

const IndexModel = require('../models/index');

module.exports = function(router) {
  const model = new IndexModel();

  router.get('/', function(req, res) {
    res.render('index', model);
  });
};
