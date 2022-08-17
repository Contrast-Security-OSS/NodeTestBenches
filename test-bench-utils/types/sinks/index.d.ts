declare const _exports: {
    [rule: string]: {
        [name: string]: Sink;
    };
};
export = _exports;
export type Param = 'input' | 'part';
export type SinkParams = {
    input?: string;
    part?: string;
};
export type SinkOpts = {
    boolean?: safe;
};
export type SinkFn = (params: SinkParams, opts?: SinkOpts) => any;
export type SinkObj = {
    [safety: string]: (params: SinkParams) => any;
};
export type Sink = SinkFn | SinkObj;
