'use strict';
const Hoek = require('@hapi/hoek');
const util = require('util');

const { utils } = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.sqlinjection';
exports.register = function sqlInjection(server, options) {
  const viewData = utils.getViewData('sql_injection', 'hapi');

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('sql-injection', { viewData })
  });

  viewData.forEach(({ uri, method, sink, key }) => {
    server.route([
      {
        path: `${uri}/safe`,
        method: [method],
        handler: async (request, h) => {
          const result = await sink('clown');
          return util.inspect(result);
        }
      },
      {
        path: `${uri}/unsafe`,
        method: [method],
        handler: async (request, h) => {
          const value = Hoek.reach(request, `${key}.input`) || '';
          const result = await sink(value);
          return util.inspect(result);
        }
      }
    ]);
  });
};
