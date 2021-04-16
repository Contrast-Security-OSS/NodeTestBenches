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
export function _fs_writeFile({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<any>;
export function _fs_writeFileSync({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<string>;
