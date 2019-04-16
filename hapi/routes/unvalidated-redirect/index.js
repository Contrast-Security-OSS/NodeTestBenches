'use strict';

exports.name = 'hapitestbench.unvalidatedredirect';


exports.register = function unvalidatedRedirect(server, options) {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'unvalidated-redirect'
      }
    },
    {method: 'GET', path: '/get',  handler: (request, h) => {
      return h.redirect(request.query.input);
    }},
  ]);
};
