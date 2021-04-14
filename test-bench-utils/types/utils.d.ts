export function getSinkData(rule: string, framework: string): SinkData[];
export function groupSinkData(sinkData: SinkData[]): {
    [input: string]: SinkData[];
};
export function getContent(rule: string): string;
export function getAllRules(): string[];
export function getRouteMeta(rule: string): Route;
export function getInput(request: IncomingMessage, key: string, params: string[], { locals, noop }?: {
    locals: any;
    noop: boolean;
}): SinkParams;
export function getResponsePreparer(rule: string): ResponsePreparer | null;
export type IncomingMessage = import("http").IncomingMessage;
export type Route = import("./routes").Route;
export type ResponsePreparer = import("./response-preparers").ResponsePreparer;
export type Sink = import("./sinks").Sink;
export type SinkParams = import("./sinks").SinkParams;
export type SinkData = {
    /**
     * unmapped input key under which user input lies
     */
    input: string;
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
    params: string[];
    /**
     * pattern we're calling the sink, i.e. safe or unsafe
     */
    safety: string;
    /**
     * sink function
     */
    sink: Sink;
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
