import {controllerFactory} from './controllerFactory';

interface Result {
  status: boolean;
  path: string;
}

export const unvalidatedRedirectControllers = controllerFactory(
  'unvalidatedRedirect',
  {
    locals: {res: 'res'},
    respond(result: Result, req, res) {
      return result.status
        ? res.redirect(301, result.path)
        : res.redirect(result.path);
    },
  },
);
