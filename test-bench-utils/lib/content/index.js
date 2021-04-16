/** @type {{ [rule: string]: string }} */
module.exports = {
  nosqlInjection: require('./nosqlInjection'),
  xpathInjection: require('./xpathInjection'),
  ssrf: require('./ssrf')
};
