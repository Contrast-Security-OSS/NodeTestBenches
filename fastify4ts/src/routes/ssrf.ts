import { controllerFactory } from '../utils/controllerFactory';
import { content } from '@contrast/test-bench-utils';

// @vulnerability: ssrf
module.exports = controllerFactory('ssrf', {
  locals: {
    requestUrl: content.ssrf.url,
  }
});
