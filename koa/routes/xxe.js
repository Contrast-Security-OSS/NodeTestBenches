'use strict';

const {
  content: {
    xxe: { attackXml }
  }
} = require('@contrast/test-bench-utils');
const controllerFactory = require('../utils/controllerFactory');

/**
 * @vulnerability: xml-external-entity
 */
module.exports = controllerFactory('xxe', {
  locals: { attackXml }
});
