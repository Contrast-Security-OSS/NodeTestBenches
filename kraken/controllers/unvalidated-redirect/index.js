'use strict';
const UnvalidatedRedirectModel = require('../../models/unvalidated-redirect');

module.exports = (router) => {
  const model = new UnvalidatedRedirectModel();

  router.get('/', (req, res) => {
    res.render('unvalidated-redirect', model);
  });

  router[model.method]('/safe', (req, res) => {
    const url = encodeURIComponent(req[model.key].input);
    res.redirect(url);
  });

  router[model.method]('/unsafe', (req, res) => {
    const url = req[model.key].input;
    res.redirect(url);
  });
};
