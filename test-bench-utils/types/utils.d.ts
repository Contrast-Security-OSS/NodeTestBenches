export function getSinkData(rule: string, framework: string): SinkData[];
export function groupSinkData(sinkData: SinkData[]): {
    headers: SinkData[];
    query: SinkData[];
    body: SinkData[];
    params: SinkData[];
    input: SinkData[];
    cookies: SinkData[];
};
export function getContent(rule: string): {
    [key: string]: string;
};
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
    input: Input;
    key: string;
    method: string;
    name: string;
    params: Param[];
    sinks: SinkObj;
    uri: string;
    url: string;
    urlWithoutParams: string;
};
