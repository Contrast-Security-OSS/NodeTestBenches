'use strict';

module.exports = function(res) {
  res.setHeader('pragma', 'no-cache');
  res.setHeader('cache-control', 'no-cache');
  return res;
};
