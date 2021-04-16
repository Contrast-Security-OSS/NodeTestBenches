'use strict';

/** @typedef {'input' | 'part'} Param */
/** @typedef {{ [param in Param]?: string }} SinkParams */

/**
 * @typedef {Object} SinkOpts
 * @property {safe=} boolean
 * @property {noop=} boolean
 */

/** @typedef {(params: SinkParams, opts?: SinkOpts) => any} SinkFn */

/** @typedef {{ [safety: string]: (params: SinkParams) => any}} SinkObj */

/** @typedef {SinkFn | SinkObj} Sink */

/** @type {{ [vulnerability: string]: { [name: string]: Sink }}} */
module.exports = {
  cmdInjection: require('./cmdInjection'),
  cmdInjectionSemanticChainedCommands: require('./cmdInjectionSemanticChainedCommands'),
  cmdInjectionSemanticDangerousPaths: require('./cmdInjectionSemanticDangerousPaths'),
  crypto: require('./crypto'),
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
  xssRenderedTemplates: require('./xssRenderedTemplates'),
  xssStealthyRequire: require('./xssStealthyRequire'),
  xssJSON: require('./xssJSON'),
  xxe: require('./xxe')
};
