'use strict';
const cp = require('child_process');

module.exports.exec = (cmd) =>
  new Promise((resolve) => {
    cp.exec(cmd, (err, data) => {
      resolve(data);
    });
  });

module.exports.execSync = (cmd) => cp.execSync(cmd);

module.exports.spawn = (fnArgs) =>
  new Promise((resolve) => {
    const [cmd, ...args] = fnArgs.split(' ');

    const command = cp.spawn(cmd, args);
    command.on('error', (err) => {
      console.log(`spawn failed on ${cmd}, err: ${err.message}`);
    });
    command.stdout.on('data', resolve);
  });

module.exports.spawnSync = (fnArgs) => {
  const [cmd, ...args] = fnArgs.split(' ');
  return cp.spawnSync(cmd, args).stdout;
};
