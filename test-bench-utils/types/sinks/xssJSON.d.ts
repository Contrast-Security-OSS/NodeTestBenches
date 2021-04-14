export function reflectedXssJSON({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean | undefined;
    noop?: boolean | undefined;
}): Promise<{
    input?: undefined;
} | {
    input: string;
}>;
