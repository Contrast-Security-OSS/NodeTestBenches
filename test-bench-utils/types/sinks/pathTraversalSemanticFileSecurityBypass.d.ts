export function _fs_readFileSync({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<string>;
export function _child_process_exec({ input }: any, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<any>;
