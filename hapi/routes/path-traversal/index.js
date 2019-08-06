'use strict';

const Hoek = require('@hapi/hoek');
const {
  sinks: { path_traversal: fs },
  routes: {
    path_traversal: { base: baseUri, sinks }
  },
  frameworkMapping: { hapi },
  utils: { buildUrls }
} = require('@contrast/test-bench-utils');
exports.name = 'hapitestbench.pathtraversal';

exports.register = function pathTraversal(server, options) {
  const { method, key } = hapi.query;
  const viewData = buildUrls({ sinks, key, baseUri });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('path-traversal', { viewData })
  });

  viewData.forEach(({ uri, sink }) => {
    server.route([
      {
        path: `${uri}/no-op`,
        method: [method],
        handler: (request, h) => 'PROBE'
      },
      {
        path: `${uri}/safe`,
        method: [method],
        handler: async (request, h) => {
          const value = encodeURIComponent(
            Hoek.reach(request, `${key}.input`) || ''
          );
          const result = await fs[sink](value);
          return result.toString();
        }
      },
      {
        path: `${uri}/unsafe`,
        method: [method],
        handler: async (request, h) => {
          const value = Hoek.reach(request, `${key}.input`) || '';
          const result = await fs[sink](value);
          return result.toString();
        }
      }
    ]);
  });
};
