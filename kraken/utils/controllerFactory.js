'use strict';

const { get } = require('lodash');

module.exports = function controllerFactory(vulnerability) {
  const Model = require(`../models/${vulnerability}`);
  const model = new Model();

  return (router) => {
    router.get('/', (req, res) => {
      res.render(vulnerability, model);
    });

    model.viewData.forEach(({ method, uri, sink, key }) => {
      router[method](`${uri}/safe`, async (req, res) => {
        const { input } = get(req, key);
        const result = await sink(input, { safe: true });
        res.send(result);
      });

      router[method](`${uri}/unsafe`, async (req, res) => {
        const { input } = get(req, key);
        const result = await sink(input);
        res.send(result);
      });

      router[method](`${uri}/noop`, async (req, res) => {
        const { input } = get(req, key);
        const result = await sink(input, { noop: true });
        res.send(result);
      });
    });
  };
};
