'use strict';

const { utils } = require('@contrast/test-bench-utils');
const routeMeta = utils.getRouteMeta('cspHeaderMissing');

module.exports = function(app, locals = {}) {
  return {
    'GET /cspHeaderMissing': function(req, res) {
      res.removeHeader('Content-Security-Policy');
      res.view('cspHeaderMissing', { ...routeMeta, ...locals });
    }
  };
}
