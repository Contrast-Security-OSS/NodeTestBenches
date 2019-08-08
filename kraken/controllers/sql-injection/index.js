'use strict';

const util = require('util');

const SqlInjectionModel = require('../../models/sql-injection');

module.exports = (router) => {
  const model = new SqlInjectionModel();

  router.get('/', (req, res) => {
    res.render('sql-injection', model);
  });

  model.viewData.forEach(({ method, uri, sink, key }) => {
    router[method](`${uri}/safe`, async (req, res) => {
      const result = await sink('clown');
      res.send(util.inspect(result));
    });

    router[method](`${uri}/unsafe`, async (req, res) => {
      const result = await sink(req[key].input);
      res.send(util.inspect(result));
    });
  });
};
