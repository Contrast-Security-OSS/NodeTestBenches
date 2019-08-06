'use strict';
const vm = require('vm');

module.exports.runInNewContext = (cmd) => {
  try {
    const sandbox = { value: '', process };
    vm.runInNewContext(`value = ${cmd}`, sandbox);
    return sandbox.value;
  } catch (e) {
    return `runInNewContext failed ${e.message}`;
  }
};

module.exports.eval = (cmd) => {
  try {
    return eval(cmd);
  } catch (e) {
    return `eval failed ${e.message}`;
  }
};

module.exports.function = (cmd) => {
  try {
    return Function(`return ${cmd};`)();
  } catch (e) {
    return `Function failed ${e.message}`;
  }
};
