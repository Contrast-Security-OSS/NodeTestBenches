const { get } = require('lodash');

const CrossSiteScriptingModel = require('../../models/xss');

module.exports = (router) => {
  const model = CrossSiteScriptingModel();

  router.get('/', (req, res) => {
    model._csrf = req.csrfToken();
    res.render('xss', model);
  });

  model.sinkData.forEach(({ method, uri, sink, key }) => {
    router[method](`${uri}/safe`, (req, res) => {
      const { input } = get(req, key);
      const result = sink(input, true);
      res.send(result);
    });

    router[method](`${uri}/unsafe`, (req, res) => {
      const { input } = get(req, key);
      const result = sink(input);
      res.send(result);
    });
  });
};
