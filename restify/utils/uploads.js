'use strict';

const fs = require('fs');

module.exports = {
  ensureDir(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return path;
  },
};
