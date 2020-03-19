'use strict';

const controllerFactory = require('../../utils/controllerFactory');

exports.name = 'hapitestbench.sqlinjection';
exports.register = controllerFactory('sqlInjection');
