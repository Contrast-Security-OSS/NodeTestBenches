import {Route, Rule, utils} from '@contrast/test-bench-utils';
import {inject} from '@loopback/core';
import {
  api,
  get,
  operation,
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';

export interface VulnerabilityController {}

export interface Options {
  locals?: object;
  respond?: typeof defaultRespond;
}

export const defaultRespond = <T>(result: T, req: Request, res: Response): T =>
  result;

function staticVulnerabilityControllerFactory(
  vulnerability: Rule,
  route: Route,
) {
  @api({basePath: route.base})
  class Controller implements VulnerabilityController {
    constructor() {}

    @get('/')
    index(@inject(RestBindings.Http.RESPONSE) res: Response) {
      const preparer = utils.getResponsePreparer(vulnerability);
      if (preparer) preparer(res);

      return {vulnerability, route};
    }
  }

  return [new Controller()];
}

function vulnerabilityControllerFactory(
  vulnerability: Rule,
  route: Route,
  locals: object,
  respond: typeof defaultRespond,
) {
  const sinkData = utils.getSinkData(vulnerability, 'loopback');
  const groupedSinkData = utils.groupSinkData(sinkData);

  @api({basePath: route.base})
  class IndexController implements VulnerabilityController {
    constructor() {}

    @get('/')
    renderRoot() {
      return {route, sinkData, groupedSinkData, ...locals};
    }
  }

  const controllers = sinkData.map(({method, params, uri, sink, key}) => {
    @api({basePath: `${route.base}${uri}`})
    class Controller implements VulnerabilityController {
      constructor() {}

      @operation(method, '/safe')
      async safe(
        @inject(RestBindings.Http.REQUEST) req: Request,
        @inject(RestBindings.Http.RESPONSE) res: Response,
      ) {
        const inputs = utils.getInput(req, key, params, {locals});
        const result = await sink(inputs, {safe: true});
        return respond(result, req, res);
      }

      @operation(method, '/unsafe')
      async unsafe(
        @inject(RestBindings.Http.REQUEST) req: Request,
        @inject(RestBindings.Http.RESPONSE) res: Response,
      ) {
        const inputs = utils.getInput(req, key, params, {locals});
        const result = await sink(inputs);
        return respond(result, req, res);
      }

      @operation(method, '/noop')
      async noop(
        @inject(RestBindings.Http.REQUEST) req: Request,
        @inject(RestBindings.Http.RESPONSE) res: Response,
      ) {
        const inputs = utils.getInput(req, key, params, {locals});
        const result = await sink(inputs, {noop: true});
        return respond(result, req, res);
      }
    }

    return new Controller();
  });

  return [new IndexController(), ...controllers];
}

export function controllerFactory(
  vulnerability: Rule,
  {locals = {}, respond = defaultRespond}: Options,
): VulnerabilityController[] {
  const route = utils.getRouteMeta(vulnerability);

  if (route.type === 'response-scanning') {
    return staticVulnerabilityControllerFactory(vulnerability, route);
  }

  return vulnerabilityControllerFactory(vulnerability, route, locals, respond);
}
