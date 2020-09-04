'use strict';

module.exports = function(res) {
  res.setHeader('X-Frame-Options', 'ALLOW-FROM http://www.example.com');
  return res;
};
