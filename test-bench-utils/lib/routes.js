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
    link: 'https://www.owasp.org/index.php/Testing_for_NoSQL_injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default
    sinks: sinks.nosqlInjection
  },
  pathTraversal: {
    base: '/pathTraversal',
    name: 'Path Traversal',
    link: 'https://www.owasp.org/index.php/pathTraversal',
    products: ['Assess', 'Protect'],
    inputs: ['headers', 'query'],
    sinks: sinks.pathTraversal
  },
  sqlInjection: {
    base: '/sqlInjection',
    name: 'SQL Injection',
    link: 'https://www.owasp.org/index.php/SQL_Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default,
    sinks: sinks.sqlInjection
  },
  ssjs: {
    base: '/ssjs',
    name: 'SSJS Injection',
    link:
      'https://ckarande.gitbooks.io/owasp-nodegoat-tutorial/content/tutorial/a1_-_server_side_js_injection.html',
    products: ['Protect'],
    inputs: ['query'],
    sinks: sinks.ssjs
  },
  ssrf: {
    base: '/ssrf',
    name: 'Server Side Request Forgery',
    link: 'https://www.owasp.org/index.php/Server_Side_Request_Forgery',
    products: ['Assess'],
    inputs: ['query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: sinks.ssrf
  },
  unsafeFileUpload: {
    base: '/unsafeFileUpload',
    name: 'Unsafe File Upload',
    link: 'https://www.owasp.org/index.php/Unrestricted_File_Upload',
    products: ['Protect'],
    inputs: ['body'],
    // This rule is specific for each framework, no sinks will be abstracted
    sinks: sinks.unsafeFileUpload
  },
  unvalidatedRedirect: {
    base: '/unvalidatedRedirect',
    name: 'Unvalidated Redirect',
    link:
      'https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_For  wards_Cheat_Sheet.html',
    products: ['Assess'],
    inputs: ['query'],
    // This rule is specific for each framework
    sinks: sinks.unvalidatedRedirect
  },
  xss: {
    base: '/xss',
    name: 'Reflected XSS',
    link:
      'https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)#Stored_and_Reflected_XSS_Attacks',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params', 'body', 'cookies'],
    sinks: sinks.xss
  },
  xxe: {
    base: '/xxe',
    name: 'XXE Processing',
    link:
      'https://www.owasp.org/index.php/XML_External_Entity_(XXE)_Processing',
    products: ['Protect'],
    inputs: ['input'],
    sinks: sinks.xxe
  }
};
