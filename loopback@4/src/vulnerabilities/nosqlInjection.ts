import {utils} from '@contrast/test-bench-utils';
import {controllerFactory} from './controllerFactory';

export const nosqlInjectionControllers = controllerFactory('nosqlInjection', {
  locals: {
    attackValues: utils.getContent('nosqlInjection'),
  },
});
