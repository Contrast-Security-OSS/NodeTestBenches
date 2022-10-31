module.exports = async function(fastify, options) {

  fastify.get('/cookies', (req, reply) => {
    reply.view('cookies', options);
  });

  fastify.get('/cookies/safe', (req, reply) => {
    const options = {
      httpOnly: true,
      secure: true
    };
    reply.setCookie('acceptable', Date.now(), options);
    reply.send({ key: 'acceptable', options });
  });

  fastify.get('/cookies/httponly', (req, reply) => {
    const options = {
      httpOnly: false,
      secure: true
    };
    reply.setCookie('httponly', Date.now(), options);
    reply.send({ key: 'httponly', options });
  });

  fastify.get('/cookies/secureFlagMissing', (req, reply) => {
    const options = {
      secure: false
    };
    reply.setCookie('secure-flag-missing', Date.now(), options);
    reply.send({ key: 'secure-flag-missing', options });
  });
};
