export function _redirect_path_({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<{
    path: string;
}>;
export function _redirect___hostname___({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<{
    path: string;
    hostname?: undefined;
} | {
    hostname: boolean;
    path: string;
}>;
export function _redirect_status__path_({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<{
    path: string;
    status?: undefined;
} | {
    status: boolean;
    path: string;
}>;
