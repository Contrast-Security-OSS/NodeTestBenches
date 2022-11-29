declare const _exports: {
    [framework: string]: FrameworkMap;
};
export = _exports;
export type InputMap = {
    method: 'get' | 'post';
    key?: string;
    param?: string;
};
export type FrameworkMap = {
    query: InputMap;
    params: InputMap;
    headers: InputMap;
    body: InputMap;
    cookies: InputMap;
    input: InputMap;
};
