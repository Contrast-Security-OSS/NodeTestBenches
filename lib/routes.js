module.exports = {
  cmd_injection: {
    base: '/cmd-injection',
    name: 'Command Injection',
    link: 'https://www.owasp.org/index.php/Command_Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    sinks: ['exec', 'execSync', 'spawn', 'spawnSync']
  },
  nosql_injection: {
    base: '/nosql-injection',
    name: 'NoSQL Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default
    sinks: [
      // 'mongodb.Collection.prototype.rename',
      // 'mongodb.Db.prototype.eval',
      // 'rethinkdb.js',
      // 'aws-sdk.DynamoDB.prototype.makeRequest'
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.batchGet',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.batchWrite',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.delete',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.query',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.scan',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.transactGet',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.transactWrite',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.get',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.update',
      // 'aws-sdk.DynamoDB.DocumentClient.prototype.put'
    ]
  },
  path_traversal: {
    base: '/path-traversal',
    name: 'Path Traversal',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    sinks: ['readFile', 'readFileSync', 'writeFile', 'writeFileSync']
  },
  sql_injection: {
    base: '/sql-injection',
    name: 'SQL Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default,
    sinks: require('./sinks/sql-injection')
  },
  ssjs: {
    base: '/ssjs-injection',
    name: 'SSJS Injection',
    products: ['Protect'],
    inputs: ['query'],
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
  ssrf: {
    base: '/ssrf',
    name: 'Server Side Request Forgery',
    products: ['Assess'],
    inputs: ['query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: ['Axios', 'Bent', 'Fetch', 'Request', 'Superagent']
  },
  // This rule is specific for each framework, no sinks will be abstracted
  unsafe_file_upload: {
    name: 'Unsafe File Upload',
    products: ['Protect'],
    base: '/unsafe-file-upload',
    inputs: ['body']
  },
  unvalidated_redirect: {
    name: 'Unvalidated Redirect',
    products: ['Assess'],
    base: '/unvalidated-redirect',
    inputs: ['query']
  },
  xss: {
    name: 'Reflected XSS',
    products: ['Assess', 'Protect'],
    base: '/xss',
    inputs: ['query', 'params', 'headers', 'body', 'cookies'],
    // There is a single `reflection` sink for reflected xss
    sinks: require('./sinks/xss')
  },
  xxe: {
    base: '/xxe',
    products: ['Protect'],
    name: 'XXE Processing',
    inputs: ['body'],
    sinks: ['parseXmlString']
  }
};
