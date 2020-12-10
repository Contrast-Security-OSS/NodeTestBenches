import {Route, Rule, utils} from '@contrast/test-bench-utils';
import {ControllerClass, inject} from '@loopback/core';
import {
  api,
  get,
  operation,
  OperationObject,
  ParameterObject,
  Request,
  Response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {pascalCase} from 'pascal-case';

export abstract class VulnerabilityController {}

export interface Options {
  locals?: {};
  respond?: typeof defaultRespond;
  response?: ResponseObject;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultRespond = (result: any, req: Request, res: Response): any =>
  result;

function staticVulnerabilityControllerFactory(
  vulnerability: Rule,
  route: Route,
) {
  @api({basePath: route.base})
  class Controller extends VulnerabilityController {
    @get('/')
    index(@inject(RestBindings.Http.RESPONSE) res: Response) {
      const preparer = utils.getResponsePreparer(vulnerability);
      if (preparer) preparer(res);

      // TODO: render EJS template.
      // for the time being API explorer should get the job done.
      return {vulnerability, route};
    }
  }

  Object.defineProperty(Controller, 'name', {
    value: `${pascalCase(vulnerability)}Controller`,
  });

  return [Controller];
}

function vulnerabilityControllerFactory(
  vulnerability: Rule,
  route: Route,
  {locals, respond = defaultRespond, response}: Options,
) {
  const sinkData = utils.getSinkData(vulnerability, 'loopback@4');
  const groupedSinkData = utils.groupSinkData(sinkData);

  @api({basePath: route.base})
  class IndexController extends VulnerabilityController {
    @get('/')
    index() {
      // TODO: render EJS template.
      // for the time being API explorer should get the job done.
      return {route, sinkData, groupedSinkData, ...locals};
    }
  }

  Object.defineProperty(IndexController, 'name', {
    value: `${pascalCase(vulnerability)}IndexController`,
  });

  const controllers = sinkData.map(
    ({input, method, params, uri, sink, key}) => {
      const parameters = params.map(
        param =>
          ({
            name: param,
            schema: {type: 'string'},
            in: input,
            required: true,
            examples: {}, // TODO
          } as ParameterObject),
      );

      const defaultResponse: ResponseObject = {
        description: `${vulnerability} return value`,
        content: {
          'text/plain': {
            schema: {type: 'string'},
          },
        },
      };

      const spec: OperationObject = {
        parameters,
        responses: {
          '200': response ?? defaultResponse,
        },
      };

      @api({basePath: `${route.base}${uri}`})
      class Controller extends VulnerabilityController {
        @operation(method, '/safe', spec)
        async safe(
          @inject(RestBindings.Http.REQUEST) req: Request,
          @inject(RestBindings.Http.RESPONSE) res: Response,
        ) {
          const inputs = utils.getInput(req, key, params, {locals});
          const result = await sink(inputs, {safe: true});
          return respond(result, req, res);
        }

        @operation(method, '/unsafe', spec)
        async unsafe(
          @inject(RestBindings.Http.REQUEST) req: Request,
          @inject(RestBindings.Http.RESPONSE) res: Response,
        ) {
          const inputs = utils.getInput(req, key, params, {locals});
          const result = await sink(inputs);
          return respond(result, req, res);
        }

        @operation(method, '/noop', spec)
        async noop(
          @inject(RestBindings.Http.REQUEST) req: Request,
          @inject(RestBindings.Http.RESPONSE) res: Response,
        ) {
          const inputs = utils.getInput(req, key, params, {locals});
          const result = await sink(inputs, {noop: true});
          return respond(result, req, res);
        }
      }

      Object.defineProperty(Controller, 'name', {
        value: `${pascalCase(`${vulnerability} ${uri}`)}Controller`,
      });

      return Controller;
    },
  );

  return [IndexController, ...controllers];
}

export function controllerFactory(
  vulnerability: Rule,
  {locals = {}, respond, response}: Options = {},
): ControllerClass<VulnerabilityController>[] {
  const route = utils.getRouteMeta(vulnerability);

  if (route.type === 'response-scanning') {
    return staticVulnerabilityControllerFactory(vulnerability, route);
  }

  return vulnerabilityControllerFactory(vulnerability, route, {
    locals,
    respond,
    response,
  });
}
