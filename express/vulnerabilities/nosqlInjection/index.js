'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');

const { attackValues, descriptions } = Object.entries(content.nosqlInjection).reduce((acc, [key, value]) => {
  if (value.attackValue) {
    acc.attackValues[key] = value.attackValue;
  }

  if (value.description) {
    acc.descriptions[key] = value.description;
  }

  return acc;
}, { attackValues: {}, descriptions: {} });

module.exports = controllerFactory('nosqlInjection', {
  locals: {
    attackValues,
    descriptions,
  }
});
