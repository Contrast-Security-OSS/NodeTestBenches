'use strict';

const { utils } = require('@contrast/test-bench-utils');
const express = require('express');
const { forEach } = require('lodash');
const path = require('path');

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
 * @param {express.Router} opts.router if provided, an express router
 * @return {express.Router} a configured express router
 */
module.exports = function controllerFactory(
  vulnerability,
  { locals = {}, respond = defaultRespond, router = express.Router() } = {}
) {
  const routeMeta = utils.getRouteMeta(vulnerability);

  if (routeMeta.type === 'response-scanning') {
    router.get('/', (req, res, next) => {
      const prep = utils.getResponsePreparer(vulnerability);
      if (prep) {
        prep(res);
      }

      return res.render(
        path.resolve(
          __dirname,
          '..',
          'vulnerabilities',
          vulnerability,
          'views',
          'index'
        ),
        { ...routeMeta, res }
      );
    });
  }
  const sinkData = utils.getSinkData(vulnerability, 'express');
  const groupedSinkData = utils.groupSinkData(sinkData);

  router.get('/', function(req, res, next) {
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
        ...locals
      }
    );
  });

  sinkData.forEach(({ method, params, uri, sinks, key }) => {
    forEach(sinks, (sink, type) => {
      router[method](`${uri}/${type}`, async (req, res, next) => {
        const inputs = utils.getInput(req, key, params, { locals });
        const result = await sink(inputs);
        respond(result, req, res, next);
      });
    });
  });

  return router;
};
