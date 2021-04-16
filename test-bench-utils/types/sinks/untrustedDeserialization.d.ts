export function untrustedDeserialization({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}): Promise<string>;
