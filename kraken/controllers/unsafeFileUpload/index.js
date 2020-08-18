'use strict';

const { utils } = require('@contrast/test-bench-utils');
const Model = require('../../models/unsafeFileUpload');

module.exports = (router) => {
  const model = new Model();

  router.get('/', (req, res) => {
    model._csrf = req.csrfToken();
    res.render('unsafeFileUpload', model);
  });

  model.sinkData.forEach(({ method, uri, sink, key, params }) => {
    router[method](uri, async (req, res) => {
      const inputs = utils.getInput(req, key, params);
      const result = await sink(inputs); // doesn't really do anything
      res.send(result);
    });
  });
};
