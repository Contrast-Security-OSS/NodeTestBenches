/** @typedef {import("http").ServerResponse} ServerResponse */

/** @typedef {(res: ServerResponse) => ServerResponse} ResponsePreparer */

/** @type {{ [vulnerability: string]: ResponsePreparer }} */
module.exports = {
  cacheControlsMissing: require('./cacheControlsMissing'),
  clickjackingControlsMissing: require('./clickjackingControlsMissing'),
  cspHeaderInsecure: require('./cspHeaderInsecure'),
  cspHeaderMissing: require('./cspHeaderMissing'),
  hstsHeaderMissing: require('./hstsHeaderMissing'),
  xContentTypeHeaderMissing: require('./xContentTypeHeaderMissing'),
  xssProtectionHeaderDisabled: require('./xssProtectionHeaderDisabled')
};
