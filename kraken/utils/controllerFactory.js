'use strict';

const { utils } = require('@contrast/test-bench-utils');
const { forEach } = require('lodash');

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
      if (model.responsePreparer) {
        model.responsePreparer(res);
      }
      res.render(vulnerability, { ...model, res });
    });

    if (model.type === 'response-scanning') {
      return;
    }

    model.sinkData.forEach(({ method, params, uri, sinks, key }) => {
      forEach(sinks, (sink, type) => {
        router[method](`${uri}/${type}`, async (req, res, next) => {
          const inputs = utils.getInput(req, key, params, { locals: model });
          const result = await sink(inputs);
          respond(result, req, res, next);
        });
      });
    });
  };
};
