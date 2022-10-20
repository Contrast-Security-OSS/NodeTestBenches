declare const _exports: {
    'mongodb.Collection.prototype.rename': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<string>;
    'mongodb.Collection.prototype.findOne': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<string>;
    'mongodb.Collection.prototype.updateOne': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<string>;
    'mongodb.Collection.prototype.findOneAndUpdate__$where': ({ input }: {
        input: any;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<string>;
    'mongodb.Collection.prototype.updateMany__$where': ({ input }: {
        input: any;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<string>;
    'aws-sdk.DynamoDB.DocumentClient.prototype.scan': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<"NOOP" | import("aws-sdk/lib/request").PromiseResult<AWS.DynamoDB.DocumentClient.ScanOutput, AWS.AWSError>>;
    'aws-sdk.DynamoDB.prototype.makeRequest': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<any>;
    'aws-sdk.DynamoDB.prototype.executeStatement': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<"NOOP" | import("aws-sdk/lib/request").PromiseResult<AWS.DynamoDB.ExecuteStatementOutput, AWS.AWSError>>;
    'aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<"NOOP" | import("@aws-sdk/client-dynamodb").ScanCommandOutput>;
    'aws-sdk.client-dynamodb.ScanCommand.FilterExpression': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<"NOOP" | import("@aws-sdk/client-dynamodb").ScanCommandOutput>;
    'aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<"NOOP" | import("@aws-sdk/client-dynamodb").ScanCommandOutput>;
    'aws-sdk.client-dynamodb.ExecuteStatementCommand': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<"NOOP" | import("@aws-sdk/client-dynamodb").ExecuteStatementCommandOutput>;
    'r.insert': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<any>;
    'r.update': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<any>;
    'r.filter': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<any>;
    'r.match': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<any>;
    'r.js': ({ input }: {
        input: string;
    }, { safe, noop }?: {
        safe?: boolean;
        noop?: boolean;
    }) => Promise<any>;
};
export = _exports;
export const _r_insert: ({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}) => Promise<any>;
export const _r_update: ({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}) => Promise<any>;
export const _r_filter: ({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}) => Promise<any>;
export const _r_match: ({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}) => Promise<any>;
export const _r_js: ({ input }: {
    input: string;
}, { safe, noop }?: {
    safe?: boolean;
    noop?: boolean;
}) => Promise<any>;
