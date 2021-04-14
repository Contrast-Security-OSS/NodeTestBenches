export function _child_process_exec({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<any>;
export function _child_process_execSync({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<string>;
export function _child_process_spawn({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<any>;
export function _child_process_spawnSync({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<string>;
