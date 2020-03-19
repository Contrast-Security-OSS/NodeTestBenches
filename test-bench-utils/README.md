# @contrast/test-bench-utils [![npm (scoped)](https://img.shields.io/npm/v/@contrast/test-bench-utils)](https://www.npmjs.com/package/@contrast/test-bench-utils)
Shared code for use in Contrast's Node.js test apps.

## Adding a shared sink
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

Then create a file under _lib/sinks/_ that exports functions with a consistent
signature:
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

## Front-end content
If there is any custom data you want to provide to the test bench front end, you
can export it from _lib/content/_. For example, we export the following XML
string as a potential attack for the xxe rule:

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
This string is then used by the `xxe.ejs` view in `@contrast/test-bench-utils`
to render an input prepopulated with the attack value.

## Adding a shared view
Once you have configured a sink you're ready to add a shared view. Shared view
templates are rendered with the following locals provided:
- `name`: the name of the vulnerability being tested
- `link`: a link to OWASP or another reference describing the vulnerability
- `sinkData`: an array of objects describing the sinks exercising a rule,
  containing (at least) the following keys:
  - `method`: the HTTP method being used to submit the attack
  - `name`: the name of the particular sink being exercised
  - `url`: the api endpoint url to hit
- `_csrf` for Kraken apps, we provide the csrf token to be included as a hidden
  field within a form

An endpoint may also be configured to provide additional locals to the template
to render additional context for a rule. For example, we provide an XML string
to the _xxe_ endpoint as a potential attack value.

## Test Bench Applications
Once you have configured the shared sink and view, consult the following
instructions for including the shared functionality in each test bench app:
- [express](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/express#adding-a-shared-vulnerability)
- [fastify](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/fastify#adding-a-shared-vulnerability)
- [hapi](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/hapi#adding-a-shared-vulnerability)
- [koa](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/koa#adding-a-shared-vulnerability)
- [kraken](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/kraken#adding-a-shared-vulnerability)
- [loopback](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/loopback#adding-a-shared-vulnerability)
