import {utils} from '@contrast/test-bench-utils';
import {controllerFactory} from './controllerFactory';

const {attackValues, descriptions} = utils.getContent('nosqlInjection');

export const nosqlInjectionControllers = controllerFactory('nosqlInjection', {
  locals: {
    attackValues,
    descriptions,
  },
});
