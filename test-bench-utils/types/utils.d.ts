export function getSinkData(rule: string, framework: string): SinkData[];
export function groupSinkData(sinkData: SinkData[]): {
    [input: string]: SinkData[];
};
export function getContent(rule: string): string;
export function getAllRules(): string[];
export function getRouteMeta(rule: string): Route;
export function getInput(request: IncomingMessage, key: string, params: Param[], { locals, noop }?: {
    locals: any;
    noop: boolean;
}): SinkParams;
export function getResponsePreparer(rule: string): ResponsePreparer | null;
export type IncomingMessage = import("http").IncomingMessage;
export type Input = import("./routes").Input;
export type Route = import("./routes").Route;
export type ResponsePreparer = import("./response-preparers").ResponsePreparer;
export type Param = import("./sinks").Param;
export type SinkFn = import("./sinks").SinkFn;
export type SinkObj = import("./sinks").SinkObj;
export type Sink = import("./sinks").Sink;
export type SinkParams = import("./sinks").SinkParams;
export type SinkData = {
    /**
     * unmapped input key under which user input lies
     */
    input: Input;
    /**
     * key under which user input lies
     */
    key: string;
    /**
     * http method
     */
    method: string;
    /**
     * the name of the sink
     */
    name: string;
    /**
     * input parameters exposed to the sink
     */
    params: Param[];
    /**
     * sink object containing methods which call the sink safely, dangerously, etc.
     */
    sinks: SinkObj;
    /**
     * relative url
     */
    uri: string;
    /**
     * fully qualified url
     */
    url: string;
    /**
     * url without parameter variable
     */
    urlWithoutParams: string;
};
