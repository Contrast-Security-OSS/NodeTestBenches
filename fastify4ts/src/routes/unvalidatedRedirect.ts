import { controllerFactory } from '../utils/controllerFactory';

/* eslint-disable @typescript-eslint/no-explicit-any */
// @vulnerability: unvalidated-redirect
export = controllerFactory('unvalidatedRedirect', {
  locals: { res: 'reply' },
  respond(result: any, request, reply) {
    return result.status
      ? reply.redirect(301, result.path)
      : reply.redirect(result.path);
  },
});
