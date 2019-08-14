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
    sinks: require('./sinks/nosqlInjection')
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
  unsafeFileUpload: {
    base: '/unsafeFileUpload',
    name: 'Unsafe File Upload',
    products: ['Protect'],
    inputs: ['body'],
    // This rule is specific for each framework, no sinks will be abstracted
    sinks: require('./sinks/unsafeFileUpload')
  },
  unvalidatedRedirect: {
    base: '/unvalidatedRedirect',
    name: 'Unvalidated Redirect',
    products: ['Assess'],
    inputs: ['query'],
    // This rule is specific for each framework
    sinks: require('./sinks/unvalidatedRedirect')
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
