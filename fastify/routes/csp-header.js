'use strict';
/**
 * @vulnerability: csp-header-insecure
 */
module.exports = async function(fastify, options) {
  const unsafePolicy = [
    "default-src 'none'",
    'font-src *',
    'img-src *',
    'media-src *',
    'script-src *',
    "style-src 'unsafe-inline' *"
  ].join('; ');

  fastify.get('/csp-header', (request, reply) => {
    reply.header('Content-Security-Policy', unsafePolicy);
    reply.view('csp-header', { ...options, policy: unsafePolicy });
    return reply;
  });
};
