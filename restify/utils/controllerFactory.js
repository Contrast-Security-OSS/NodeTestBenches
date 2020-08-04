'use strict';
const { utils } = require('@contrast/test-bench-utils');
const path = require('path');
const { Router } = require('restify-router');

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

  sinkData.forEach(({ method, uri, sink, key }) => {
    router[method](`${uri}/safe`, async (req, res, next) => {
      const input = utils.getInput({ locals, req, key });
      const result = await sink(input, { safe: true });
      respond(result, req, res, next);
    });

    router[method](`${uri}/unsafe`, async (req, res, next) => {
      const input = utils.getInput({ locals, req, key });
      const result = await sink(input);
      respond(result, req, res, next);
    });

    router[method](`${uri}/noop`, async (req, res, next) => {
      const input = 'noop';
      const result = await sink(input, { noop: true });
      respond(result, req, res, next);
    });
  });

  return router;
};
