export function pug({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<any>;
export function ejs({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<any>;
export function handlebars({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<string>;
