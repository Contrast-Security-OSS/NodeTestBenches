'use strict';

const Hoek = require('@hapi/hoek');
const {
  sinks: { cmd_injection: cmdi },
  routes: {
    cmd_injection: { base: baseUri, sinks }
  },
  frameworkMapping: { hapi },
  utils: { buildUrls }
} = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.cmdinjection';

exports.register = function cmdInjection(server, options) {
  const { method, key } = hapi.query;
  const viewData = buildUrls({ sinks, key, baseUri });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('cmd-injection', { viewData })
  });

  viewData.forEach(({ uri, sink }) => {
    server.route([
      {
        path: `${uri}/safe`,
        method: [method],
        handler: (request, h) => 'SAFE'
      },
      {
        path: `${uri}/unsafe`,
        method: [method],
        handler: async (request, h) => {
          const value = Hoek.reach(request, `${key}.input`) || '';
          const result = await cmdi[sink](value);
          return result.toString();
        }
      }
    ]);
  });
};
