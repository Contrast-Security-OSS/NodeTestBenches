module.exports = {
  cmdInjection: {
    base: '/cmdInjection',
    name: 'Command Injection',
    link: 'https://www.owasp.org/index.php/Command_Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    sinks: require('./sinks/cmdInjection')
  },
  nosqlInjection: {
    base: '/nosqlInjection',
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
  pathTraversal: {
    base: '/pathTraversal',
    name: 'Path Traversal',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    sinks: require('./sinks/pathTraversal')
  },
  sqlInjection: {
    base: '/sqlInjection',
    name: 'SQL Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default,
    sinks: require('./sinks/sqlInjection')
  },
  ssjs: {
    base: '/ssjs',
    name: 'SSJS Injection',
    products: ['Protect'],
    inputs: ['query'],
    sinks: require('./sinks/ssjs')
  },
  ssrf: {
    base: '/ssrf',
    name: 'Server Side Request Forgery',
    products: ['Assess'],
    inputs: ['query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: require('./sinks/ssrf')
  },
  // This rule is specific for each framework, no sinks will be abstracted
  unsafe_file_upload: {
    base: '/unsafe-file-upload',
    name: 'Unsafe File Upload',
    products: ['Protect'],
    inputs: ['body']
  },
  unvalidated_redirect: {
    base: '/unvalidated-redirect',
    name: 'Unvalidated Redirect',
    products: ['Assess'],
    inputs: ['query']
  },
  xss: {
    base: '/xss',
    name: 'Reflected XSS',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params', 'headers', 'body', 'cookies'],
    sinks: require('./sinks/xss')
  },
  xxe: {
    base: '/xxe',
    name: 'XXE Processing',
    products: ['Protect'],
    inputs: ['body'],
    sinks: require('./sinks/xxe')
  }
};
