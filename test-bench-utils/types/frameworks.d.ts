declare const _exports: {
    [framework: string]: FrameworkMap;
};
export = _exports;
export type InputMap = {
    method: string;
    key?: string | undefined;
    param?: string | undefined;
};
export type FrameworkMap = {
    query: InputMap;
    params: InputMap;
    headers: InputMap;
    body: InputMap;
    cookies: InputMap;
    input: InputMap;
};
