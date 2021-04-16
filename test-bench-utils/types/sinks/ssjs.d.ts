export function eval({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<any>;
export function Function({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<any>;
export function _vm_runInNewContext({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<string>;
