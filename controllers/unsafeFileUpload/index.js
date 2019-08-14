'use strict';
const { get } = require('lodash');

const Model = require('../../models/unsafeFileUpload');

module.exports = (router) => {
  const model = new Model();

  router.get('/', (req, res) => {
    model._csrf = req.csrfToken();
    res.render('unsafeFileUpload', model);
  });

  model.sinkData.forEach(({ method, uri, sink, key }) => {
    router[method](uri, async (req, res) => {
      const { input } = get(req, key);
      const result = await sink(input);
      res.send(result);
    });
  });
};
