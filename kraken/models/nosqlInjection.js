'use strict';

const {
  content: {
    nosqlInjection: {
      attackValues,
      descriptions
    }
  },
  utils
} = require('@contrast/test-bench-utils');

module.exports = function SQLInjectionModel() {
  const sinkData = utils.getSinkData('nosqlInjection', 'kraken');
  const routeMeta = utils.getRouteMeta('nosqlInjection');

  return {
    ...routeMeta,
    sinkData,
    attackValues,
    descriptions
  };
};
