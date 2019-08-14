'use strict';

const { utils } = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: xml-external-entity
 */
module.exports = controllerFactory('xxe', {
  locals: { attackXml: utils.attackXml }
});
