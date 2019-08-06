'use strict';
const PathTraversalModel = require('../../models/path-traversal');

module.exports = (router) => {
  const model = new PathTraversalModel();

  router.get('/', (req, res) => {
    res.render('path-traversal', model);
  });

  model.viewData.forEach(({ uri, sink }) => {
    router[model.method](`${uri}/no-op`, (req, res) => {
      res.send('SAFE');
    });

    router[model.method](`${uri}/safe`, async (req, res) => {
      const cmd = encodeURIComponent(req[model.key].input);
      const data = await model.fs[sink](cmd);
      res.send(data.toString());
    });

    router[model.method](`${uri}/unsafe`, async (req, res) => {
      const cmd = req[model.key].input;
      const data = await model.fs[sink](cmd);
      res.send(data.toString());
    });
  });
};
