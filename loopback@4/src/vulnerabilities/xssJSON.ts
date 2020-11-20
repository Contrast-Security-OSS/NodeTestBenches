import {controllerFactory} from './controllerFactory';

export const xssJSONControllers = controllerFactory('xssJSON', {
  respond(result, req, res) {
    return res.json(result);
  },
});
