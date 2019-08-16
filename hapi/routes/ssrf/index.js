'use strict';

const Hoek = require('@hapi/hoek');

const { utils } = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

exports.name = 'hapitestbench.ssrf';
exports.register = function(server, options) {
  const sinkData = utils.getSinkData('ssrf', 'hapi');
  const routeMeta = utils.getRouteMeta('ssrf');

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: {
        template: 'ssrf',
        context: {
          ...routeMeta,
          requestUrl: EXAMPLE_URL,
          sinkData
        }
      }
    }
  });

  sinkData.forEach(({ name, method, sink, key }) => {
    server.route([
      {
        path: `/${name}/query`,
        method,
        handler: async (request, h) => {
          const input = Hoek.reach(request, `${key}.input`) || '';
          const url = `${EXAMPLE_URL}?q=${input}`;
          const data = await sink(url);
          return data;
        }
      },
      {
        path: `/${name}/path`,
        method,
        handler: async (request, h) => {
          const input = Hoek.reach(request, `${key}.input`) || '';
          const url = `http://${input}`;
          const data = await sink(url);
          return data;
        }
      }
    ]);
  });
};
