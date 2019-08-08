'use strict';
const {
  routes: {
    unvalidated_redirect: { base: baseUri }
  },
  frameworkMapping: { hapi }
} = require('@contrast/test-bench-utils');

exports.name = 'hapitestbench.unvalidatedredirect';

exports.register = function unvalidatedRedirect(server, options) {
  const { method, key } = hapi.query;
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) =>
        h.view('unvalidated-redirect', {
          res: 'h',
          url: baseUri
        })
    },
    {
      method,
      path: '/safe',
      handler: (request, h) =>
        h.redirect(encodeURIComponent(request[key].input))
    },
    {
      method,
      path: '/unsafe',
      handler: (request, h) => h.redirect(request[key].input)
    }
  ]);
};
