'use strict';

const { content } = require('@contrast/test-bench-utils');
const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.xxe';
exports.register = controllerFactory('xxe', {
  locals: { attackXml: content.xxe.attackXml }
});
