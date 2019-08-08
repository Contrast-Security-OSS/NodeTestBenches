'use strict';
const Hoek = require('@hapi/hoek');
const util = require('util');

const {
  sinks,
  routes,
  frameworkMapping,
  utils
} = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.sqlinjection';

exports.register = function sqlInjection(server, options) {
  const { method, key } = frameworkMapping.hapi.query;
  const viewData = utils.buildUrls({
    key,
    sinks: routes.sqli.sinks,
    baseUri: routes.sqli.base
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('sql-injection', { viewData })
  });

  viewData.forEach(({ uri, sink }) => {
    server.route([
      {
        path: `${uri}/safe`,
        method: [method],
        handler: async (request, h) => {
          const result = await sinks.sqli[sink]('clown');
          return util.inspect(result);
        }
      },
      {
        path: `${uri}/unsafe`,
        method: [method],
        handler: async (request, h) => {
          const value = Hoek.reach(request, `${key}.input`) || '';
          const result = await sinks.sqli[sink](value);
          return util.inspect(result);
        }
      }
    ]);
  });
};
