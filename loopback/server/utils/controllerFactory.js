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
 * @param {Object} opts.locals additional locals to provide to EJS
 * @param {ResponseFn} opts.respond if provided, a custom return or response
 */
module.exports = function controllerFactory(
  vulnerability,
  { locals = {}, respond = defaultRespond } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'loopback');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);
  const responsePreparer = utils.getResponsePreparer(vulnerability);

  return function(server) {
    const router = server.loopback.Router();
    server.use(`/${vulnerability}`, router);

    router.get('/', function(req, res, next) {
      if (responsePreparer) {
        responsePreparer(res);
      }

      res.render(`pages/${vulnerability}`, {
        ...routeMeta,
        groupedSinkData,
        sinkData,
        ...locals,
        res
      });
    });

    if (routeMeta.type === 'response-scanning') {
      return;
    }

    sinkData.forEach(({ method, params, uri, sinks, key }) => {
      forEach(sinks, (sink, type) => {
        router[method](`${uri}/${type}`, async (req, res, next) => {
          try {
            const inputs = utils.getInput(req, key, params, { locals });
            const result = await sink(inputs);
            respond(result, req, res, next);
          } catch (err) {
            next(err);
          }
        });
      });
    });
  };
};
