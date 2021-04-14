declare const _exports: {
    [route: string]: Route;
};
export = _exports;
export type Sink = import("./sinks").Sink;
export type Route = {
    base: string;
    name: string;
    link: string;
    products: string[];
    type?: string | undefined;
    inputs?: string[] | undefined;
    params?: string[] | undefined;
    sinks?: {
        [name: string]: sinks.Sink;
    };
};
import sinks = require("./sinks");
