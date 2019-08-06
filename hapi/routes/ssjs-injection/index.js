'use strict';

const Hoek = require('@hapi/hoek');
const {
  sinks: { ssjs },
  routes: {
    ssjs: { base: baseUri, sinks }
  },
  frameworkMapping: { hapi },
  utils: { buildUrls }
} = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.ssjsinjection';

exports.register = function ssjsInjection(server, options) {
  const { method, key } = hapi.query;
  const viewData = buildUrls({ sinks, key, baseUri });
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('ssjs-injection', { viewData })
  });

  viewData.forEach(({ uri, sink }) => {
    console.log('sink', sink, uri);
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
          const result = await ssjs[sink](value);
          return result;
        }
      }
    ]);
  });
};
