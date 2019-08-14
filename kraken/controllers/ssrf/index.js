'use strict';
const { get } = require('lodash');

const SSRFModel = require('../../models/ssrf');

module.exports = (router) => {
  const model = new SSRFModel();

  router.get('/', (req, res) => {
    res.render('ssrf', model);
  });

  model.sinkData.forEach(({ method, sink, name, key }) => {
    router[method](`/${name}/query`, async (req, res) => {
      const { input } = get(req, key);
      const url = `${model.requestUrl}?q=${input}`;
      const result = await sink(url);
      res.send(result);
    });

    router[method](`/${name}/path`, async (req, res) => {
      const { input } = get(req, key);
      const url = `http://${input}`;
      const result = await sink(url);
      res.send(result);
    });
  });
};
