module.exports = {
  cmd_injection: {
    base: '/cmd-injection',
    applicableInputs: ['query'], // default
    sinks: ['exec', 'execSync', 'spawn', 'spawnSync']
  }
};
