'use strict';

const vulnerability = 'cspHeaderMissing';
const Base = require('./baseResponseScanningRuleModel');

module.exports = class CSPHeaderMissingModel extends Base {
  constructor() {
    super(vulnerability);
  }
};
