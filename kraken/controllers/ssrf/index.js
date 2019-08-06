'use strict';
const SSRFModel = require('../../models/ssrf');

module.exports = (router) => {
  const model = new SSRFModel();

  router.get('/', (req, res) => {
    res.render('ssrf', model);
  });

  model.sinks.forEach((sink) => {
    const lib = sink.toLowerCase();
    router[model.method](`/${lib}/query`, async (req, res) => {
      const url = `${model.requestUrl}?q=${req[model.key].input}`;
      const data = await model.ssrf[`make${sink}Request`](url);
      res.send(data.toString());
    });

    router[model.method](`/${lib}/path`, async (req, res) => {
      const url = `http://${req[model.key].input}`;
      const data = await model.ssrf[`make${sink}Request`](url);
      res.send(data.toString());
    });
  });
};
