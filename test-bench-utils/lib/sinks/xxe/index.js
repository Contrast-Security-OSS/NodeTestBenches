'use strict';
const libxmljs = require('libxmljs');

module.exports.parseXmlString = (xml, safe) =>
  libxmljs.parseXmlString(xml, { noent: !safe });
