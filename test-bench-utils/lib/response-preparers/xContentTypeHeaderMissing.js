'use strict';

module.exports = function(res) {
  res.removeHeader('X-Content-Type-Options');
  return res;
};
