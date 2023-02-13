import build from './app';

build().then(app => {
  app.listen({ port: parseInt(process.env.PORT || '3000', 10), host: process.env.HOST || 'localhost' });
})
