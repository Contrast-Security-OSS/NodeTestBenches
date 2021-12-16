'use strict';

module.exports = function(app, locals) {
  return require('../utils/controllerFactory')('hstsHeaderMissing', app, { locals });
}
