declare const _exports: {
    [rule: string]: ResponsePreparer;
};
export = _exports;
export type ServerResponse = import("http").ServerResponse;
export type ResponsePreparer = (res: ServerResponse) => ServerResponse;
