declare const MYSQL_USER: string;
declare const MYSQL_HOST: string;
declare const MYSQL_DATABASE: string;
declare const MYSQL_PASSWORD: string;
declare const MYSQL_PORT: string | 3306;
export { MYSQL_USER as user, MYSQL_HOST as host, MYSQL_DATABASE as database, MYSQL_PASSWORD as password, MYSQL_PORT as port, bluebird as Promise };
