'use strict';

module.exports = function(res) {
  res.removeHeader('Strict-Transport-Security');
  return res;
};
