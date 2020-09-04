'use strict';

const cspHeaders = [
  'content-security-policy',
  'x-content-security-policy',
  'x-webkit-csp'
];

module.exports = function(res) {
  cspHeaders.forEach((header) => {
    res.removeHeader(header);
  });
};
