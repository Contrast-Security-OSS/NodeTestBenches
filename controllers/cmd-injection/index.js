'use strict';
const CmdInjectionModel = require('../../models/cmd-injection');

module.exports = (router) => {
  const model = new CmdInjectionModel();

  router.get('/', (req, res) => {
    res.render('cmd-injection', model);
  });

  model.viewData.forEach(({ uri, sink }) => {
    router[model.method](`${uri}/safe`, (req, res) => {
      res.send('SAFE');
    });

    router[model.method](`${uri}/unsafe`, async (req, res) => {
      const cmd = req[model.key].input;
      const data = await model.cmdi[sink](cmd);
      res.send(data.toString());
    });
  });
};
