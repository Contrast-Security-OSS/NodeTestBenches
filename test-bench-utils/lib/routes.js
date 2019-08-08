module.exports = {
  cmd_injection: {
    base: '/cmd-injection',
    inputs: ['query'],
    sinks: ['exec', 'execSync', 'spawn', 'spawnSync']
  },
  nosql_injection: {
    base: '/nosql-injection',
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
    inputs: ['query'],
    sinks: ['readFile', 'readFileSync', 'writeFile', 'writeFileSync']
  },
  sql_injection: {
    base: '/sql-injection',
    inputs: ['query'], // default,
    sinks: require('./sinks/sql-injection')
  },
  ssjs: {
    base: '/ssjs-injection',
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
    inputs: ['query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: ['Axios', 'Bent', 'Fetch', 'Request', 'Superagent']
  },
  // This rule is specific for each framework, no sinks will be abstracted
  unsafe_file_upload: {
    base: '/unsafe-file-upload',
    inputs: ['body']
  },
  unvalidated_redirect: {
    base: '/unvalidated-redirect',
    inputs: ['query']
  },
  xss: {
    base: '/xss',
    inputs: ['query', 'params', 'headers', 'body', 'cookies'],
    // There is a single `reflection` sink for reflected xss
    sinks: require('./sinks/xss')
  },
  xxe: {
    base: '/xxe',
    inputs: ['body'],
    sinks: ['parseXmlString']
  }
};
