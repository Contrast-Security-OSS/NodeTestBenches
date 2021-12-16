'use strict';

const { utils } = require('@contrast/test-bench-utils');
const { forEach } = require('lodash');
const defaultRespond = (result, req, res, next) => res.send(result);

module.exports = function controllerFactory(
  vulnerability,
  sails,
  { locals = {}, respond = defaultRespond } = {}
) {
  const routeMeta = utils.getRouteMeta(vulnerability);
  const sailsRoutes = {};

  if (routeMeta.type === 'response-scanning') {
    sailsRoutes[`/${vulnerability}`] = function(req, res, next) {
      const prep = utils.getResponsePreparer(vulnerability);
      if (prep) { prep(res) }
      return res.view(vulnerability, { ...routeMeta, res });
    };
  }

  const sinkData = utils.getSinkData(vulnerability, 'sails');
  const groupedSinkData = utils.groupSinkData(sinkData);

  sailsRoutes[`GET /${vulnerability}`] = function(req, res, next) {
    return res.view(vulnerability, {
      ...routeMeta,
      groupedSinkData,
      sinkData,
      ...locals
    });
  };

  sinkData.forEach(({ method, params, uri, sinks, key }) => {
    forEach(sinks, (sink, type) => {
      sailsRoutes[`${method} /${vulnerability}${uri}/${type}`] = async function(req, res, next) {
        const inputs = utils.getInput(req, key, params, { locals });
        const result = await sink(inputs);
        respond(result, req, res, next);
      }
    });
  });

  return sailsRoutes;
};
