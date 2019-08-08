'use strict';

const util = require('util');

const SqlInjectionModel = require('../../models/sqli');

module.exports = (router) => {
  const model = new SqlInjectionModel();

  router.get('/', (req, res) => {
    res.render('sqli', model);
  });

  model.viewData.forEach(({ uri, sink }) => {
    router[model.method](`${uri}/safe`, async (req, res) => {
      const result = await model.sqli[sink]('clown');
      res.send(util.inspect(result));
    });

    router[model.method](`${uri}/unsafe`, async (req, res) => {
      const result = await model.sqli[sink](req[model.key].input);
      res.send(util.inspect(result));
    });
  });
};
