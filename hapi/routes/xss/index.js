'use strict';

const Hoek = require('@hapi/hoek');

const { utils } = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.reflectedxss';
exports.register = function reflectedXss(server, options) {
  const sinkData = utils.getSinkData('xss', 'hapi');
  const viewData = utils.groupSinkData(sinkData);

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('xss', { viewData })
  });

  sinkData.forEach(({ uri, method, sink, key }) => {
    server.route([
      {
        path: `${uri}/safe`,
        method: [method],
        handler: (request, h) => {
          const input = Hoek.reach(request, `${key}.input`) || '';
          return sink(input, true);
        }
      },
      {
        path: `${uri}/unsafe`,
        method: [method],
        handler: (request, h) => {
          const input = Hoek.reach(request, `${key}.input`) || '';
          return sink(input);
        }
      }
    ]);
  });
};
