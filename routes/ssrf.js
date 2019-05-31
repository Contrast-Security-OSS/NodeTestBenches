'use strict';

const {
  sinks: { ssrf }
} = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

module.exports = ({ router }) => {
  router.get('/ssrf', (ctx) => ctx.render('ssrf', { requestUrl: EXAMPLE_URL }));

  const libs = ['axios', 'bent', 'fetch', 'request', 'superagent'];

  libs.forEach((lib) => {
    router.get(`/ssrf/${lib}/unsafe`, async (ctx, next) => {
      const url = createUnsafeUrl(ctx.query.input);
      const data = await makeRequest(lib, url);

      ctx.body = data;
    });

    router.post(`/ssrf/${lib}/unsafe`, async (ctx, next) => {
      const url = createUnsafeUrl(ctx.request.body.input);
      const data = await makeRequest(lib, url);

      ctx.body = data;
    });

    router.get(`/ssrf/${lib}/safe`, async (ctx, next) => {
      const url = createSafeUrl(ctx.query.input);
      const data = await makeRequest(lib, url);

      ctx.body = data;
    });

    router.post(`/ssrf/${lib}/safe`, async (ctx, next) => {
      const url = createSafeUrl(ctx.request.body.input);
      const data = await makeRequest(lib, url);

      ctx.body = data;
    });
  });
};

const createUnsafeUrl = (input) => `${EXAMPLE_URL}?q=${input}`;

const createSafeUrl = (input) =>
  `${EXAMPLE_URL}?q=${encodeURIComponent(input)}`;

const makeRequest = async function makeRequest(lib, url) {
  switch (lib) {
    case 'axios':
      return ssrf.makeAxiosRequest(url);
    case 'bent':
      return ssrf.makeBentRequest(url);
    case 'fetch':
      return ssrf.makeFetchRequest(url);
    case 'request':
      return ssrf.makeRequestRequest(url);
    case 'superagent':
      return ssrf.makeSuperagentRequest(url);
  }
};
