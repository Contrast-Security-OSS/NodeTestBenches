module.exports = {
  cacheControlsMissing: require('./cacheControlsMissing'),
  clickjackingControlsMissing: require('./clickjackingControlsMissing'),
  cspHeaderInsecure: require('./cspHeaderInsecure'),
  cspHeaderMissing: require('./cspHeaderMissing'),
  hstsHeaderMissing: require('./hstsHeaderMissing'),
  xContentTypeHeaderMissing: require('./xContentTypeHeaderMissing'),
  xssProtectionHeaderDisabled: require('./xssProtectionHeaderDisabled')
};
