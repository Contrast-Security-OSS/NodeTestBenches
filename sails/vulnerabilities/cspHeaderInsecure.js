'use strict';

const { utils } = require('@contrast/test-bench-utils');
const routeMeta = utils.getRouteMeta('cspHeaderInsecure');

const unsafePolicy = [
  "default-src 'none'",
  'font-src *',
  'img-src *',
  'media-src *',
  'script-src *',
  "style-src 'unsafe-inline' *"
].join('; ');

module.exports = function(app, locals = {}) {
  return {
    'GET /cspHeaderInsecure': function(req, res) {
      res.set('Content-Security-Policy', unsafePolicy);
      res.view('cspHeaderInsecure', { ...routeMeta, ...locals });
    }
  };
}
