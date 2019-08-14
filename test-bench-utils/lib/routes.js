const sinks = require('./sinks');

module.exports = {
  cmdInjection: {
    base: '/cmdInjection',
    name: 'Command Injection',
    link: 'https://www.owasp.org/index.php/Command_Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    sinks: sinks.cmdInjection
  },
  nosqlInjection: {
    base: '/nosqlInjection',
    name: 'NoSQL Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default
    sinks: sinks.nosqlInjection
  },
  pathTraversal: {
    base: '/pathTraversal',
    name: 'Path Traversal',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    sinks: sinks.pathTraversal
  },
  sqlInjection: {
    base: '/sqlInjection',
    name: 'SQL Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default,
    sinks: sinks.sqlInjection
  },
  ssjs: {
    base: '/ssjs',
    name: 'SSJS Injection',
    products: ['Protect'],
    inputs: ['query'],
    sinks: sinks.ssjs
  },
  ssrf: {
    base: '/ssrf',
    name: 'Server Side Request Forgery',
    products: ['Assess'],
    inputs: ['query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: sinks.ssrf
  },
  unsafeFileUpload: {
    base: '/unsafeFileUpload',
    name: 'Unsafe File Upload',
    products: ['Protect'],
    inputs: ['body'],
    // This rule is specific for each framework, no sinks will be abstracted
    sinks: sinks.unsafeFileUpload
  },
  unvalidatedRedirect: {
    base: '/unvalidatedRedirect',
    name: 'Unvalidated Redirect',
    products: ['Assess'],
    inputs: ['query'],
    // This rule is specific for each framework
    sinks: sinks.unvalidatedRedirect
  },
  xss: {
    base: '/xss',
    name: 'Reflected XSS',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params', 'headers', 'body', 'cookies'],
    sinks: sinks.xss
  },
  xxe: {
    base: '/xxe',
    name: 'XXE Processing',
    products: ['Protect'],
    inputs: ['body'],
    sinks: sinks.xxe
  }
};
