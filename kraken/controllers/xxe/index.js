'use strict';
const XXEModel = require('../../models/xxe');

module.exports = (router) => {
  const model = new XXEModel();

  router.get('/', (req, res) => {
    // not putting this in model because req is not in context yet
    model._csrf = req.csrfToken();
    res.render('xxe', model);
  });

  model.sinks.forEach((sink) => {
    router[model.method](`/safe`, (req, res) => {
      const data = model.xxe[sink](model.attackXml, true);
      res.send(data.toString());
    });

    router[model.method]('/unsafe', (req, res) => {
      const data = model.xxe[sink](model.attackXml);
      res.send(data.toString());
    });
  });
};
