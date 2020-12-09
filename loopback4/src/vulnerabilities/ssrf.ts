import {utils} from '@contrast/test-bench-utils';
import {controllerFactory} from './controllerFactory';

export const ssrfControllers = controllerFactory('ssrf', {
  locals: {
    requestUrl: utils.getContent('ssrf').url,
  },
});
