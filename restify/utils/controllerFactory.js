'use strict';

const { utils } = require('@contrast/test-bench-utils');
const path = require('path');
const { Router } = require('restify-router');
const wrapHandler = require('./wrapHandler');

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
  { locals = {}, respond = defaultRespond, router = new Router() } = {}
) {
  const sinkData = utils.getSinkData(vulnerability, 'restify');
  const groupedSinkData = utils.groupSinkData(sinkData);
  const routeMeta = utils.getRouteMeta(vulnerability);

  router.get('/', (req, res, next) => {
    res.render(
      path.resolve(
        __dirname,
        '..',
        'vulnerabilities',
        vulnerability,
        'views',
        'index'
      ),
      {
        ...routeMeta,
        groupedSinkData,
        sinkData,
        locals,
      }
    );
  });

  sinkData.forEach(({ method, params, uri, sink, key }) => {
    router[method](
      `${uri}/safe`,
      wrapHandler(async (req, res, next) => {
        const inputs = utils.getInput(req, key, params, { locals });
        const result = await sink(inputs, { safe: true });
        respond(result, req, res, next);
      })
    );

    router[method](
      `${uri}/unsafe`,
      wrapHandler(async (req, res, next) => {
        const inputs = utils.getInput(req, key, params, { locals });
        const result = await sink(inputs);
        respond(result, req, res, next);
      })
    );

    router[method](
      `${uri}/noop`,
      wrapHandler(async (req, res, next) => {
        const inputs = utils.getInput(req, key, params, { noop: true });
        const result = await sink(inputs, { noop: true });
        respond(result, req, res, next);
      })
    );
  });

  return router;
};
