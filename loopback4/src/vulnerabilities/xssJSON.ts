import {controllerFactory} from './controllerFactory';

export const xssJSONControllers = controllerFactory('xssJSON', {
  respond(result, req, res) {
    return res.json(result);
  },
  response: {
    description: `xssJSON return value`,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            input: {type: 'string'},
          },
        },
      },
    },
  },
});
