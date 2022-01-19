import {utils} from '@contrast/test-bench-utils';
import {pull} from 'lodash';
import {Loopback4TestBenchApplication} from '../application';
import {controllerFactory} from './controllerFactory';
import {nosqlInjectionControllers} from './nosqlInjection';
import {nosqlExpansionControllers} from './nosqlExpansion';
import {ssrfControllers} from './ssrf';
import {unvalidatedRedirectControllers} from './unvalidatedRedirect';
import {xpathInjectionControllers} from './xpathInjection';
import {xssJSONControllers} from './xssJSON';

export function configureVulnerableRoutes(app: Loopback4TestBenchApplication) {
  nosqlInjectionControllers.forEach(c => app.controller(c));
  nosqlExpansionControllers.forEach(c => app.controller(c));
  ssrfControllers.forEach(c => app.controller(c));
  unvalidatedRedirectControllers.forEach(c => app.controller(c));
  xpathInjectionControllers.forEach(c => app.controller(c));
  xssJSONControllers.forEach(c => app.controller(c));

  // These rules use the default implementation, so no controller factory params
  // were necessary.
  pull(
    utils.getAllRules(),
    'nosqlInjection',
    'nosqlExpansion',
    'ssrf',
    'unvalidatedRedirect',
    'xpathInjection',
    'xssJSON',
  ).forEach(rule => {
    const controllers = controllerFactory(rule);
    controllers.forEach(c => app.controller(c));
  });
}
