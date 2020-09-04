'use strict';

const vulnerability = 'cspHeaderInsecure';
const Base = require('./baseResponseScanningRuleModel');

module.exports = class CSPHeaderInsecureModel extends Base {
  constructor() {
    super(vulnerability);
  }
};
