'use strict';

const {
  sinks: { ssrf }
} = require('@contrast/test-bench-utils');

const path = require('path');

const EXAMPLE_URL = 'http://www.example.com';

exports.name = 'hapitestbench.ssrf';

exports.register = function ssrf(server, options) {
  // base index HTML page
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: path.resolve(
        __dirname,
        '..',
        '..',
        'node_modules',
        '@contrast',
        'test-bench-content',
        'views',
        'ssrf.html'
      )
    }
  });

  // programatically generate the vulnerability routes for each lib
  const libs = ['axios', 'bent', 'fetch', 'request', 'superagent'];

  libs.forEach((lib) => {
    server.route([
      {
        path: `/${lib}/unsafe`,
        method: 'GET',
        handler: async (request, h) => {
          const url = createUnsafeUrl(request.query.input);
          const data = await makeRequest(lib, url);

          return data;
        }
      },
      {
        path: `/${lib}/unsafe`,
        method: 'POST',
        handler: async (request, h) => {
          const url = createUnsafeUrl(request.body.input);
          const data = await makeRequest(lib, url);

          return data;
        }
      },
      {
        path: `/${lib}/safe`,
        method: 'GET',
        handler: async (request, h) => {
          const url = createSafeUrl(request.query.input);
          const data = await makeRequest(lib, url);

          return data;
        }
      },
      {
        path: `/${lib}/safe`,
        method: 'POST',
        handler: async (request, h) => {
          const url = createSafeUrl(request.body.input);
          const data = await makeRequest(lib, url);

          return data;
        }
      }
    ]);
  });
};

const createUnsafeUrl = (input) => `${EXAMPLE_URL}?q=${input}`;

const createSafeUrl = (input) =>
  `${EXAMPLE_URL}?q=${encodeURIComponent(input)}`;

const makeRequest = async function makeRequest(lib, url) {
  switch (lib) {
    case 'axios':
      return ssrf.makeAxiosRequest(url);
    case 'bent':
      return ssrf.makeBentRequest(url);
    case 'fetch':
      return ssrf.makeFetchRequest(url);
    case 'request':
      return ssrf.makeRequestRequest(url);
    case 'superagent':
      return ssrf.makeSuperagentRequest(url);
  }
};
