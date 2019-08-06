'use strict';

const {
  routes: {
    ssrf: { sinks }
  },
  frameworkMapping: { hapi },
  sinks: { ssrf }
} = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

exports.name = 'hapitestbench.ssrf';

exports.register = function(server, options) {
  const { method, key } = hapi.query;
  // base index HTML page
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: {
        template: 'ssrf',
        context: {
          requestUrl: EXAMPLE_URL
        }
      }
    }
  });

  sinks.forEach((sink) => {
    const lib = sink.toLowerCase();
    server.route([
      {
        path: `/${lib}/query`,
        method,
        handler: async (request, h) => {
          const url = `${EXAMPLE_URL}?q=${request[key].input}`;
          const data = await ssrf[`make${sink}Request`](url);
          return data;
        }
      },
      {
        path: `/${lib}/path`,
        method,
        handler: async (request, h) => {
          const url = `http://${request[key].input}`;
          const data = await ssrf[`make${sink}Request`](url);
          return data;
        }
      }
    ]);
  });
};
