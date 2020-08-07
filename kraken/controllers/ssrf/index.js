'use strict';
const { get } = require('lodash');
const controllerFactory = require('../../utils/controllerFactory');

module.exports = controllerFactory('ssrf', {
  getInput({ req, key }) {
    const { input, part } = get(req, key);
    return [input, part];
  }
});
