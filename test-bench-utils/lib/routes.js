module.exports = {
  cmd_injection: {
    base: '/cmd-injection',
    applicableInputs: ['query'], // default
    sinks: ['exec', 'execSync', 'spawn', 'spawnSync']
  },
  path_traversal: {
    base: '/path-traversal',
    applicableInputs: ['query'], // default
    sinks: ['readFile', 'readFileSync', 'writeFile', 'writeFileSync']
  }
};
