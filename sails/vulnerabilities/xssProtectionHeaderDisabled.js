'use strict';
module.exports = function(app, locals) {
  return  require('../utils/controllerFactory')('xssProtectionHeaderDisabled', app, { locals });
}
