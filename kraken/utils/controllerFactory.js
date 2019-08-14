'use strict';

const { get } = require('lodash');

const defaultRespond = (result, req, res) => res.send(result);

/**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object=} opts
 * @param {Function=} opts.respond if provided, a custom return or response
 */
module.exports = function controllerFactory(
  vulnerability,
  { respond = defaultRespond } = {}
) {
  const Model = require(`../models/${vulnerability}`);

  return (router) => {
    const model = new Model();

    router.get('/', (req, res) => {
      // Not putting this in the model because req is not in context yet
      req._csrf = req.csrfToken();
      res.render(vulnerability, model);
    });

    model.sinkData.forEach(({ method, uri, sink, key }) => {
      router[method](`${uri}/safe`, async (req, res) => {
        const { input } = get(req, key);
        const result = await sink(input, { safe: true });
        respond(result, req, res);
      });

      router[method](`${uri}/unsafe`, async (req, res) => {
        const { input } = get(req, key);
        const result = await sink(input);
        respond(result, req, res);
      });

      router[method](`${uri}/noop`, async (req, res) => {
        const { input } = get(req, key);
        const result = await sink(input, { noop: true });
        respond(result, req, res);
      });
    });
  };
};
