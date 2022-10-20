export function _fs_readFile({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<any>;
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
export function _child_process_execSync({ input }: any, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<string>;
