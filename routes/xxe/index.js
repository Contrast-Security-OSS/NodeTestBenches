'use strict';

const { utils } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.xxe';
exports.register = controllerFactory('xxe', {
  locals: { attackXml: utils.attackXml }
});
