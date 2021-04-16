export function reflectedXssJSON({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<{
    input?: undefined;
} | {
    input: string;
}>;
