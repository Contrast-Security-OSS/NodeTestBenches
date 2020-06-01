'use strict';

module.exports = {
  cmdInjection: require('./cmdInjection'),
  cmdInjectionSemanticChainedCommands: require('./cmdInjectionSemanticChainedCommands'),
  cmdInjectionSemanticDangerousPaths: require('./cmdInjectionSemanticDangerousPaths'),
  nosqlInjection: require('./nosqlInjection'),
  pathTraversal: require('./pathTraversal'),
  sqlInjection: require('./sqlInjection'),
  ssjs: require('./ssjs'),
  ssrf: require('./ssrf'),
  unsafeFileUpload: require('./unsafeFileUpload'),
  untrustedDeserialization: require('./untrustedDeserialization'),
  unvalidatedRedirect: require('./unvalidatedRedirect'),
  xpathInjection: require('./xpathInjection'),
  xss: require('./xss'),
  xssStealthyRequire: require('./xssStealthyRequire'),
  xssJSON: require('./xssJSON'),
  xxe: require('./xxe')
};
