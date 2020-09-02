'use strict';

const vulnerability = 'autocompleteMissing';
const Base = require('./baseResponseScanningRuleModel');

module.exports = class CSPHeaderInsecureModel extends Base {
  constructor() {
    super(vulnerability);
  }
};
