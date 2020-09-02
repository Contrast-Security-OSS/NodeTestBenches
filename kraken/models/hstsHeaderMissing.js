'use strict';

const vulnerability = 'hstsHeaderMissing';
const Base = require('./baseResponseScanningRuleModel');

module.exports = class CSPHeaderInsecureModel extends Base {
  constructor() {
    super(vulnerability);
  }
};
