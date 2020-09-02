'use strict';

const unsafePolicy = [
  "default-src 'none'",
  'font-src *',
  'img-src *',
  'media-src *',
  'script-src *',
  "style-src 'unsafe-inline' *"
].join('; ');

module.exports = function(res) {
  res.setHeader('Content-Security-Policy', unsafePolicy);
  return res;
};
