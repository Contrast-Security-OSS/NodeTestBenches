import {ApplicationConfig, Loopback4TestBenchApplication} from './application';
import {configureVulnerableRoutes} from './vulnerabilities';
import qs from 'qs'

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new Loopback4TestBenchApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      expressSettings: {
        ['query parser']: function(str: string) {
          return qs.parse(str, {allowDots: true})
        }
      },
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config)
    .then(app => {
      // Configure our routes!
      configureVulnerableRoutes(app);
    })
    .catch(err => {
      console.error('Cannot start the application.', err);
      process.exit(1);
    });
}
