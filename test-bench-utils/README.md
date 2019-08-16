# test-bench-utils
Shared code for use in Contrast's Node.js test apps.

## Adding a shared sink to multiple apps
Under _lib/routes.js_, create a sink definition with the following form:
```js
  [ruleName: string]: {
    base: string,                    // '/cmdInjection',
    name: string,                    // 'Command Injection',
    link: string,                    // 'https://www.owasp.org/index.php/Command_Injection',
    products: string[],              // ['Assess', 'Protect']
    inputs: string[],                // ['query'],
    sinks: Object<string, Function>, // sinks.commmandInjection
  }
```

Then create a file under _lib/sinks/_ that exports functions with a consistent signature:
```js
  /**
   * @param {string} input user input string
   * @param {Object} opts
   * @param {boolean=} opts.safe are we calling the sink safely?
   * @param {boolean=} opts.noop are we calling the sink as a noop?
   */
  module.exports['sinkName'] = async function sink(input, { safe = false, noop = false } = {}) {};
```
The sink function will be called by the endpoint handler appropriately by each
framework. By default, for the `/unsafe` endpoint the function is called with
user input, and for the `/safe` and `/noop` endpoints it is called with the
`safe` and `noop` options set to true, respectively.

### Front-end content
If there is any custom data you want to provide to the test bench front end, you
can export it from _lib/content/_. For example, we export the following XML string
as a potential attack for the xxe rule:

_lib/content/xxe.js_
```js
module.exports.attackXml = `
<!DOCTYPE read-fs [<!ELEMENT read-fs ANY >
<!ENTITY passwd SYSTEM "file:///etc/passwd" >]>
<users>
  <user>
    <read-fs>&passwd;</read-fs>
    <name>C.K Frode</name>
  </user>
</users>`;
```
This string is then used by the `xxe.ejs` view in `@contrast/test-bench-content`
to render an input prepopulated with the attack value.

### Views
After you have configured a sink within `@contrast/test-bench-utils`, you should
add a shared view in [`@contrast/test-bench-content`](https://github.com/Contrast-Security-OSS/test-bench-content).
