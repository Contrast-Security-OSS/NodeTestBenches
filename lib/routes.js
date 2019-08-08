module.exports = {
  cmd_injection: {
    base: '/cmd-injection',
    applicableInputs: ['query'],
    sinks: ['exec', 'execSync', 'spawn', 'spawnSync']
  },
  path_traversal: {
    base: '/path-traversal',
    applicableInputs: ['query'],
    sinks: ['readFile', 'readFileSync', 'writeFile', 'writeFileSync']
  },
  ssrf: {
    base: '/ssrf',
    applicableInputs: ['query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: ['Axios', 'Bent', 'Fetch', 'Request', 'Superagent']
  },
  ssjs: {
    base: '/ssjs-injection',
    applicableInputs: ['query'],
    // eval tests CODE_STRING sink type
    // runInNewContext tests CODE_ENV sink type
    sinks: [
      { function: 'eval', code: 'eval(`value = ${input};`)' },
      { function: 'function', code: 'Function(`return ${input}`)()' },
      {
        function: 'runInNewContext',
        lib: 'vm',
        code: 'vm.runInNewContext(`value = ${input}`, sandbox)'
      }
    ]
  },
  // This rule is specific for each framework, no sinks will be
  // abstracted
  unsafe_file_upload: {
    base: '/unsafe-file-upload',
    applicableInputs: ['body']
  },
  xxe: {
    base: '/xxe',
    applicableInputs: ['body'],
    sinks: ['parseXmlString']
  },
  sqli: {
    base: '/sqli',
    applicableInputs: ['query'], // default,
    sinks: [
      'sequelize.prototype.query',
      // 'typeorm.Repository.prototype.query',
      // 'typeorm.Connection.prototype.query',
      'mysql/lib/Connection.query'
      // 'pg.Connection.prototype.query',
      // 'sqlite3.Database.prototype.all',
      // 'sqlite3.Database.prototype.run',
      // 'sqlite3.Database.prototype.get',
      // 'sqlite3.Database.prototype.each',
      // 'sqlite3.Database.prototype.exec',
      // 'sqlite3.Database.prototype.prepare'
    ]
  }
};
