'use strict';

const vulnerability = 'clickjackingControlsMissing';
const Base = require('./baseResponseScanningRuleModel');

module.exports = class CSPHeaderInsecureModel extends Base {
  constructor() {
    super(vulnerability);
  }
};
