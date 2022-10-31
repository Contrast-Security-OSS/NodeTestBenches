import { controllerFactory } from '../utils/controllerFactory';
import { content } from '@contrast/test-bench-utils';
/**
 * @vulnerability: nosql-injection
 * @vulnerability: nosql-injection-mongo
 */

export = controllerFactory('nosqlInjection', {
  locals: {
    attackValues: content.nosqlInjection.attackValues,
    descriptions: content.nosqlInjection.descriptions,
  }
});
