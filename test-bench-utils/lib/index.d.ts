// Type definitions for @contrast/test-bench-utils 3.15.0
// Project: https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/main/test-bench-utils
// Definitions by: Griffin Yourick <https://github.com/tough-griff>

/// <reference types="node"/>
import { IncomingMessage, ServerResponse } from 'http';

declare namespace TestBenchUtils {
  type Rule =
    | 'cmdInjection'
    | 'cmdInjectionSemanticChainedCommands'
    | 'cmdInjectionSemanticDangerousPaths'
    | 'nosqlInjection'
    | 'pathTraversal'
    | 'sqlInjection'
    | 'ssjs'
    | 'ssrf'
    | 'unsafeFileUpload'
    | 'untrustedDeserialization'
    | 'unvalidatedRedirect'
    | 'xpathInjection'
    | 'xss'
    | 'xssJSON'
    | 'xssStealthyRequire'
    | 'xxe'
    | 'parampollution'
    | 'crypto'
    | 'cspHeaderMissing'
    | 'cspHeaderInsecure'
    | 'hstsHeaderMissing'
    | 'xContentTypeHeaderMissing'
    | 'xssProtectionHeaderDisabled'
    | 'autocompleteMissing'
    | 'cacheControlsMissing'
    | 'clickjackingControlsMissing';

  type Framework =
    | 'restify'
    | 'express'
    | 'kraken'
    | 'loopback'
    | 'loopback@4'
    | 'koa'
    | 'hapi';

  type Product = 'Assess' | 'Protect';
  type Input = 'query' | 'params' | 'headers' | 'body' | 'cookies' | 'input';

  interface SinkParams {
    input?: string;
    part?: string;
  }

  type Param = keyof SinkParams;

  interface SinkOpts {
    safe?: boolean;
    noop?: boolean;
  }

  interface Sink {
    (params: SinkParams, opts?: SinkOpts): any;
  }

  interface SinkData {
    input: Input;
    key: string;
    method: string;
    name: string;
    params: Param[];
    sink: Sink;
    uri: string;
    url: string;
    urlWithoutParams: string;
  }

  interface Route {
    base: string;
    name: string;
    link: string;
    products: Product[];
    type?: string;
    inputs?: Input[];
    params?: Param[];
    sinks?: { [name: string]: Sink };
  }

  interface ResponsePreparer {
    (res: ServerResponse): ServerResponse;
  }

  namespace utils {
    /** Generates sink data for a given rule and framework. */
    function getSinkData(rule: Rule, framework: Framework): SinkData[];

    /** Groups sink data arrays by input type (query, body, etc). */
    function groupSinkData(
      sinkData: SinkData[]
    ): { [input: string]: SinkData[] };

    /** Return all configured routes */
    function getRules(): Rule[];

    /** Returns route metadata for a given rule */
    function getRouteMeta(rule: Rule): Route;

    /** Gets the proper input(s) from either req or from model */
    function getInput<T>(
      request: IncomingMessage,
      key: string,
      params: Param[],
      opts?: {
        locals?: Object;
        noop?: boolean;
      }
    ): SinkParams;

    /** Returns the Response preparing function for a given rule */
    function getResponsePreparer(rule: Rule): ResponsePreparer | null;
  }
}

export = TestBenchUtils;
