declare const _exports: {
    [vulnerability: string]: ResponsePreparer;
};
export = _exports;
export type ServerResponse = import("http").ServerResponse;
export type ResponsePreparer = (res: ServerResponse) => ServerResponse;
