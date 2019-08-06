'use strict';
const fs = require('fs');
const errMsg = (method, msg, safe) =>
  safe ? `Congrats, you are safe! Error from ${method}: ${msg}` : `Done!`;

module.exports.readFile = (path, safe) =>
  new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        data = errMsg('readFile', err.message, safe);
      }
      resolve(data);
    });
  });

module.exports.readFileSync = (path, safe) => {
  try {
    return fs.readFileSync(path);
  } catch (e) {
    return errMsg('readFileSync', e.message, safe);
  }
};

module.exports.writeFile = (path, safe) =>
  new Promise((resolve) => {
    fs.writeFile(path, 'stuff', (err, data) => {
      if (err) {
        data = errMsg('readFile', err.message, safe);
      }
      resolve(data || 'Done!');
    });
  });

module.exports.writeFileSync = (path, safe) => {
  try {
    fs.writeFileSync(path, 'stuff');
    return 'Done!';
  } catch (e) {
    return errMsg('writeFileSync', e.message, safe);
  }
};
