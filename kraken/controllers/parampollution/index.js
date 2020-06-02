'use strict';
const { get } = require('lodash');

//const SSRFModel = require('../../models/ssrf');

module.exports = (router) => {
  //const model = new SSRFModel();

  router.get('/', (req, res) => {
    res.render('parampollution', {});
  });
};
