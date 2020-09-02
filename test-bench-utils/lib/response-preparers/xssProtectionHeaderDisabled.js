'use strict';

module.exports = function(res) {
  res.setHeader('X-XSS-Protection', '0');
  return res;
};
