export const navRoutes: Pick<routes.Route, keyof routes.Route>[];
import routes = require("./routes");
export declare const content: {
    nosqlInjection: typeof import("./content/nosqlInjection");
    xpathInjection: typeof import("./content/xpathInjection");
    ssrf: typeof import("./content/ssrf");
};
export declare const utils: typeof import("./utils");
export { routes };
