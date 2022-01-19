import {controllerFactory} from './controllerFactory';
import {decode} from 'html-entities';

export const nosqlExpansionControllers = controllerFactory('nosqlExpansion', {
    respond(result, req, res) {
      return decode(result);
    },
    response: {
      description: `nosqlExpansion return value`,
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
