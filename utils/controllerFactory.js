'use strict';

const Hoek = require('@hapi/hoek');

const { utils } = require('@contrast/test-bench-utils');

module.exports = function controllerFactory(vulnerability) {
  return (server, options) => {
    const viewData = utils.getViewData(vulnerability, 'hapi');

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view(vulnerability, { viewData })
    });

    viewData.forEach(({ uri, method, sink, key }) => {
      server.route([
        {
          path: `${uri}/safe`,
          method: [method],
          handler: async (request, h) => {
            const input = Hoek.reach(request, `${key}.input`) || '';
            return sink(input, { safe: true });
          }
        },
        {
          path: `${uri}/unsafe`,
          method: [method],
          handler: async (request, h) => {
            const input = Hoek.reach(request, `${key}.input`) || '';
            const result = await sink(input);
            return result;
          }
        },
        {
          path: `${uri}/noop`,
          method: [method],
          handler: async (request, h) => {
            const input = Hoek.reach(request, `${key}.input`) || '';
            const result = await sink(input, { noop: true });
            return result;
          }
        }
      ]);
    });
  };
};
