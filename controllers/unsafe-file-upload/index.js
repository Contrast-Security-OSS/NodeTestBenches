'use strict';
const UFUModel = require('../../models/unsafe-file-upload');

module.exports = (router) => {
  const model = new UFUModel();

  router.get('/', (req, res) => {
    // not putting this in model because req is not in context yet
    model._csrf = req.csrfToken();
    res.render('unsafe-file-upload', model);
  });

  router[model.method](`/submit`, async (req, res) => {
    const data = req[model.key].input;
    res.send(data);
  });
};
