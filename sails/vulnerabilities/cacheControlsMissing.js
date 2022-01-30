'use strict';

const { utils } = require('@contrast/test-bench-utils');
const routeMeta = utils.getRouteMeta('cacheControlsMissing');

module.exports = function(app, locals = {}) {
  return {
    'GET /cacheControlsMissing': function(req, res) {
      res.set('pragma', 'no-cache');
      res.set('cache-control', 'no-cache');
      res.view('cacheControlsMissing', { ...routeMeta, ...locals });
    }
  };
}
