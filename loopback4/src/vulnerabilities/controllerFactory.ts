/* eslint-disable @typescript-eslint/no-explicit-any */
import {Param, Route, utils} from '@contrast/test-bench-utils';
import {ControllerClass, inject} from '@loopback/core';
import {
  api,
  get,
  operation,
  OperationObject,
  ParameterObject,
  Request,
  RequestBodyObject,
  Response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {pascalCase} from 'pascal-case';
import {flatMap, fromPairs, map} from 'lodash';
import {renderFile} from 'ejs';
import {resolve} from 'path';

export abstract class VulnerabilityController {}

export interface Options {
  locals?: {};
  respond?: typeof defaultRespond;
  response?: ResponseObject;
}

export const defaultRespond = (result: any, req: Request, res: Response): any =>
  result;

function staticVulnerabilityControllerFactory(
  vulnerability: string,
  route: Route,
) {
  @api({basePath: route.base})
  class Controller extends VulnerabilityController {
    @get('/')
    index(@inject(RestBindings.Http.RESPONSE) res: Response) {
      const preparer = utils.getResponsePreparer(vulnerability);
      if (preparer) preparer(res);

      return renderFile(
        resolve(
          __dirname,
          '..',
          '..',
          'node_modules',
          '@contrast',
          'test-bench-utils',
          'public',
          'views',
          `${vulnerability}.ejs`,
        ),
        {vulnerability, ...route},
      );
    }
  }

  Object.defineProperty(Controller, 'name', {
    value: `${pascalCase(vulnerability)}Controller`,
  });

  return [Controller];
}

function formatParameterSpecs(
  input: string,
  params: Param[],
): ParameterObject[] {
  if (input === 'body') {
    return [];
  }

  // mapping of test-bench-utils parameter types
  // to lb4 parameter types
  const paramMapping: any = {
    headers: 'header',
    params: 'path',
  };

  return params.map(
    param =>
      ({
        name: param,
        schema: {type: 'string'},
        in: paramMapping[input] ? paramMapping[input] : input,
        required: true,
        examples: {}, // TODO
      } as ParameterObject),
  );
}

function formatBodySpec(): RequestBodyObject {
  const requestBodySpec: RequestBodyObject = {
    description: 'user input',
    required: false,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['input'],
          properties: {
            input: {
              type: 'string',
            },
          },
        },
      },
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            input: {
              type: 'string',
            },
          },
        },
      },
    },
  };
  return requestBodySpec;
}

function getInputs(
  args: any,
  inputType: string,
  params: Param[],
  opts?: {
    locals?: Object;
    noop?: boolean;
  },
): any {
  if (opts?.noop) return fromPairs(map(params, param => [param, 'noop']));

  if (inputType === 'body') {
    return {input: args[0].input};
  }

  const result: any = {};
  params.map((param, index) => {
    result[param] = args[index];
  });
  return result;
}

function vulnerabilityControllerFactory(
  vulnerability: string,
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

  const controllers = flatMap(
    sinkData,
    ({input, method, params, uri, sinks}) => {
      const parameters: ParameterObject[] = formatParameterSpecs(input, params);

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
        requestBody: input === 'body' ? formatBodySpec() : undefined,
      };

      return map(sinks, (sink, pattern) => {
        @api({basePath: `${route.base}${uri}`})
        class Controller extends VulnerabilityController {
          @operation(method, pattern, spec)
          async sink(
            @inject(RestBindings.Http.REQUEST) req: Request,
            @inject(RestBindings.Http.RESPONSE) res: Response,
            ...args: any[]
          ) {
            const inputs = getInputs(args, input, params, {
              locals,
              noop: pattern === 'noop',
            });
            const result = await sink(inputs);
            return respond(result, req, res);
          }
        }

        Object.defineProperty(Controller, 'name', {
          value: `${pascalCase(
            `${vulnerability} ${uri} ${pattern}`,
          )}Controller`,
        });

        return Controller;
      });
    },
  );

  return [IndexController, ...controllers];
}

export function controllerFactory(
  vulnerability: string,
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
