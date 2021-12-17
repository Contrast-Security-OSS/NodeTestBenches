const sinks = require('./sinks');

/** @typedef {import("./sinks").Param} Param */
/** @typedef {import("./sinks").Sink} Sink */

/** @typedef {'Assess' | 'Protect'} Product */
/** @typedef {'query' | 'params' | 'headers' | 'body' | 'cookies' | 'input'} Input */

/**
 * @typedef {Object} Route
 * @property {string} base
 * @property {string} name
 * @property {string} link
 * @property {Product[]} products
 * @property {string} [type]
 * @property {Input[]} [inputs]
 * @property {Param[]} [params]
 * @property {{ [name: string]: Sink }} [sinks]
 */

/** @type {{ [rule: string]: Route }} */
module.exports = {
  cmdInjection: {
    base: '/cmdInjection',
    name: 'Command Injection',
    link: 'https://www.owasp.org/index.php/Command_Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'cookies'],
    params: ['input'],
    sinks: sinks.cmdInjection
  },
  cmdInjectionSemanticChainedCommands: {
    base: '/cmdInjectionSemanticChainedCommands',
    name: 'Command Injection Semantic Chained Commands',
    link: 'https://www.owasp.org/index.php/Command_Injection',
    products: ['Protect'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.cmdInjectionSemanticChainedCommands
  },
  cmdInjectionSemanticDangerousPaths: {
    base: '/cmdInjectionSemanticDangerousPaths',
    name: 'Command Injection Semantic Dangerous Paths',
    link: 'https://www.owasp.org/index.php/Command_Injection',
    products: ['Protect'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.cmdInjectionSemanticDangerousPaths
  },
  nosqlInjection: {
    base: '/nosqlInjection',
    name: 'NoSQL Injection',
    link: 'https://www.owasp.org/index.php/Testing_for_NoSQL_injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default
    params: ['input'],
    sinks: sinks.nosqlInjection
  },
  nosqlExpansion: {
    base: '/nosqlExpansion',
    name: 'NoSQL Expansion',
    link: 'https://www.owasp.org/index.php/Testing_for_NoSQL_injection',
    products: ['Protect'],
    inputs: ['query'], // default,
    params: ['input'],
    sinks: sinks.nosqlExpansion
  },
  pathTraversal: {
    base: '/pathTraversal',
    name: 'Path Traversal',
    link: 'https://www.owasp.org/index.php/pathTraversal',
    products: ['Assess', 'Protect'],
    inputs: ['headers', 'query', 'body'],
    params: ['input'],
    sinks: sinks.pathTraversal
  },
  sqlInjection: {
    base: '/sqlInjection',
    name: 'SQL Injection',
    link: 'https://www.owasp.org/index.php/SQL_Injection',
    products: ['Assess', 'Protect'],
    inputs: ['query'], // default,
    params: ['input'],
    sinks: sinks.sqlInjection
  },
  ssjs: {
    base: '/ssjs',
    name: 'SSJS Injection',
    link:
      'https://ckarande.gitbooks.io/owasp-nodegoat-tutorial/content/tutorial/a1_-_server_side_js_injection.html',
    products: ['Protect'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.ssjs
  },
  ssrf: {
    base: '/ssrf',
    name: 'Server Side Request Forgery',
    link: 'https://www.owasp.org/index.php/Server_Side_Request_Forgery',
    products: ['Assess'],
    inputs: ['query'],
    params: ['input', 'part'],
    parts: ['host', 'path', 'query'],
    // these are not sinks but the ssrf sinks file has helpers to make a request for each
    sinks: sinks.ssrf
  },
  unsafeFileUpload: {
    base: '/unsafeFileUpload',
    name: 'Unsafe File Upload',
    link: 'https://www.owasp.org/index.php/Unrestricted_File_Upload',
    products: ['Protect'],
    inputs: ['body'],
    params: ['input'],
    // This rule is specific for each framework, no sinks will be abstracted
    sinks: sinks.unsafeFileUpload
  },
  untrustedDeserialization: {
    base: '/untrustedDeserialization',
    name: 'Untrusted Deserialization',
    link:
      'https://owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data',
    products: ['Protect'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.untrustedDeserialization
  },
  unvalidatedRedirect: {
    base: '/unvalidatedRedirect',
    name: 'Unvalidated Redirect',
    link:
      'https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html',
    products: ['Assess'],
    inputs: ['query'],
    params: ['input'],
    // This rule is specific for each framework
    sinks: sinks.unvalidatedRedirect
  },
  xpathInjection: {
    base: '/xpathInjection',
    name: 'XPath Injection',
    link: 'https://owasp.org/www-community/attacks/XPATH_Injection',
    products: ['Assess'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.xpathInjection
  },
  xss: {
    base: '/xss',
    name: 'Reflected XSS',
    link:
      'https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)#Stored_and_Reflected_XSS_Attacks',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params'],
    params: ['input'],
    sinks: sinks.xss
  },
  xssRenderedTemplates: {
    base: '/xssRenderedTemplates',
    name: 'Reflected XSS Template Engines',
    link:
      'https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)#Stored_and_Reflected_XSS_Attacks',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params'],
    params: ['input'],
    sinks: sinks.xssRenderedTemplates
  },
  xssJSON: {
    base: '/xssJSON',
    name: 'Reflected XSS JSON (Safe)',
    link:
      'https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)#Stored_and_Reflected_XSS_Attacks',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params'],
    params: ['input'],
    sinks: sinks.xssJSON
  },
  xssStealthyRequire: {
    base: '/xssStealthyRequire',
    name: 'Reflected XSS (stealthy-require)',
    link:
      'https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)#Stored_and_Reflected_XSS_Attacks',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params'],
    params: ['input'],
    sinks: sinks.xssStealthyRequire
  },
  xxe: {
    base: '/xxe',
    name: 'XXE Processing',
    link:
      'https://www.owasp.org/index.php/XML_External_Entity_(XXE)_Processing',
    products: ['Assess', 'Protect'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.xxe
  },
  parampollution: {
    base: '/parampollution',
    name: 'HTTP Parameter Pollution',
    link:
      'https://owasp.org/www-pdf-archive/AppsecEU09_CarettoniDiPaola_v0.8.pdf',
    products: ['Assess'],
    type: 'response-scanning'
  },
  crypto: {
    base: '/crypto',
    name: 'Crypto Rules',
    link:
      'https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A3-Sensitive_Data_Exposure',
    products: ['Assess'],
    inputs: ['query'],
    params: ['input'],
    sinks: sinks.crypto
  },
  cspHeaderMissing: {
    base: '/cspHeaderMissing',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP',
    name: 'Content Security Policy Missing',
    products: ['Assess'],
    type: 'response-scanning'
  },
  cspHeaderInsecure: {
    base: '/cspHeaderInsecure',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP',
    name: 'Content Security Policy Insecure',
    products: ['Assess'],
    type: 'response-scanning'
  },
  hstsHeaderMissing: {
    base: '/hstsHeaderMissing',
    link:
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
    name: 'HSTS Header Missing',
    products: ['Assess'],
    type: 'response-scanning'
  },
  xContentTypeHeaderMissing: {
    base: '/xContentTypeHeaderMissing',
    name: 'X-Content-Type-Options Header Missing',
    link:
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
    products: ['Assess'],
    type: 'response-scanning'
  },
  xssProtectionHeaderDisabled: {
    base: '/xssProtectionHeaderDisabled',
    name: 'X-XSS-Protection Header Disabled',
    link:
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',
    products: ['Assess'],
    type: 'response-scanning'
  },
  autocompleteMissing: {
    base: '/autocompleteMissing',
    name: 'Autocomplete Missing',
    link:
      'https://wiki.owasp.org/index.php/Testing_for_Vulnerable_Remember_Password_and_Pwd_Reset_(OWASP-AT-006)',
    products: ['Assess'],
    type: 'response-scanning'
  },
  cacheControlsMissing: {
    base: '/cacheControlsMissing',
    name: 'Cache Controls Missing',
    link: 'https://wiki.owasp.org/index.php/Cache_Poisoning',
    products: ['Assess'],
    type: 'response-scanning'
  },
  clickjackingControlsMissing: {
    base: '/clickjackingControlsMissing',
    name: 'Clickjacking Controls Missing',
    link: '',
    products: ['Assess'],
    type: 'response-scanning'
  }
};
