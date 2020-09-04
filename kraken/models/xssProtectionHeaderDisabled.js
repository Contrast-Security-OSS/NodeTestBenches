'use strict';

const vulnerability = 'xssProtectionHeaderDisabled';
const Base = require('./baseResponseScanningRuleModel');

module.exports = class CSPHeaderInsecureModel extends Base {
  constructor() {
    super(vulnerability);
  }
};
