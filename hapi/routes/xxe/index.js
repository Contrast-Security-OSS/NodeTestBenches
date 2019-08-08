'use strict';
const {
  sinks: { xxe },
  routes: {
    xxe: { base: baseUri, sinks }
  },
  frameworkMapping: { hapi },
  utils: { attackXml }
} = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.xxeinjection';

exports.register = function(server, options) {
  const { method } = hapi.body;
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('xxe', { attackXml, url: baseUri })
  });

  sinks.forEach((sink) => {
    server.route([
      {
        path: '/safe',
        method,
        handler: (request, h) => {
          const data = xxe[sink](attackXml, true);
          return data.toString();
        }
      },
      {
        path: '/unsafe',
        method,
        handler: (request, h) => {
          const data = xxe[sink](attackXml);
          return data.toString();
        }
      }
    ]);
  });
};
