declare const MSSQL_USER: string;
declare const MSSQL_PASSWORD: string;
declare const MSSQL_HOST: string;
declare const MSSQL_DATABASE: string;
export declare const port: number;
export declare namespace options {
    const trustServerCertificate: boolean;
}
export { MSSQL_USER as user, MSSQL_PASSWORD as password, MSSQL_HOST as server, MSSQL_DATABASE as database };
