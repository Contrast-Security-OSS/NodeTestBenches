declare const _exports: {
    [route: string]: Route;
};
export = _exports;
export type Param = import("./sinks").Param;
export type Sink = import("./sinks").Sink;
export type Product = 'Assess' | 'Protect';
export type Input = 'query' | 'params' | 'headers' | 'body' | 'cookies' | 'input';
export type Route = {
    base: string;
    name: string;
    link: string;
    products: Product[];
    type?: string | undefined;
    inputs?: Input[] | undefined;
    params?: Param[] | undefined;
    sinks?: {
        [name: string]: sinks.Sink;
    };
};
import sinks = require("./sinks");
