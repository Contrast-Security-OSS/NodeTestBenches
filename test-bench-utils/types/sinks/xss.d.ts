export function reflectedXss({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<string>;
