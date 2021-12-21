export const dbInit: Promise<any>;
export namespace connectionParams {
    export { RDBHOST as host };
    export { RDBPORT as port };
    export { RDBUSER as user };
    export { RDBPASSWORD as password };
    export { RDBDATABASE as db };
    export { RDBTIMEOUT as timeout };
}
export function dotJsFnString(data: any): string;
declare const RDBHOST: string;
declare const RDBPORT: string | 28015;
declare const RDBUSER: string;
declare const RDBPASSWORD: string;
declare const RDBDATABASE: string;
declare const RDBTIMEOUT: string | 60;
export { r };
