'use strict';
const SSJSModel = require('../../models/ssjs-injection');

module.exports = (router) => {
  const model = new SSJSModel();

  router.get('/', (req, res) => {
    res.render('ssjs-injection', model);
  });

  model.viewData.forEach(({ uri, sink }) => {
    router[model.method](`${uri}/safe`, async (req, res) => {
      res.send('SAFE');
    });

    router[model.method](`${uri}/unsafe`, async (req, res) => {
      const cmd = req[model.key].input;
      const data = await model.ssjs[sink](cmd);
      res.send(data);
    });
  });
};
