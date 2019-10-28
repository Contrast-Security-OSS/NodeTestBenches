'use strict';

const { get } = require('lodash');

/**
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 *
 * @callback ResponseFn
 * @param {any} result return value of the sink method
 * @param {express.Request} req express request object
 * @param {express.Response} res express response object
 * @param {express.NextFunction} next express `next`
 */

/**
 * @type {ResponseFn}
 */
const defaultRespond = (result, req, res, next) => res.send(result);

/**
 * Gets the proper input from either req or from model
 * @param {Object} params
 * @param {Object} params.model Kraken model
 * @param {Object} params.req IncomingMessage
 * @param {string} params.key key on request to get input from
 */
function getInput({ model, req, key }) {
  return model.input || get(req, key).input;
}

/**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object} opts
 * @param {ResponseFn} opts.respond if provided, a custom return or response
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
      router[method](`${uri}/safe`, async (req, res, next) => {
        const input = getInput({ model, req, key });
        const result = await sink(input, { safe: true });
        respond(result, req, res, next);
      });

      router[method](`${uri}/unsafe`, async (req, res, next) => {
        const input = getInput({ model, req, key });
        console.log('my input', input);
        const result = await sink(input);
        respond(result, req, res, next);
      });

      router[method](`${uri}/noop`, async (req, res, next) => {
        const input = getInput({ model, req, key });
        const result = await sink(input, { noop: true });
        respond(result, req, res, next);
      });
    });
  };
};
