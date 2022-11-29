import { controllerFactory } from '../utils/controllerFactory';

const {
  content: {
    xpathInjection: { xml }
  }
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@contrast/test-bench-utils');

export = controllerFactory('xpathInjection', {
  locals: {
    xml,
  },
});
