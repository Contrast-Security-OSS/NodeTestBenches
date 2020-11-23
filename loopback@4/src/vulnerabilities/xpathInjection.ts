import {utils} from '@contrast/test-bench-utils';
import {controllerFactory} from './controllerFactory';

export const xpathInjectionControllers = controllerFactory('xpathInjection', {
  locals: {
    xml: utils.getContent('xpathInjection').xml,
  },
});
