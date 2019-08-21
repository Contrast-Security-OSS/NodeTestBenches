# HapiTestBench
screener app for Hapi

**Note**: `master` branch will always test the latest @hapi npm packages.

If you're looking for a specific version:

 * [Hapi 18](https://github.com/Contrast-Security-OSS/HapiTestBench/tree/hapi18)
 * [Hapi 17](https://github.com/Contrast-Security-OSS/HapiTestBench/tree/hapi17)
 * [Hapi 16](https://github.com/Contrast-Security-OSS/Hapi16TestBench)

## Installation
```bash
npm install
node server.js
```

## Requirements:
[mongodb](https://docs.mongodb.com/manual/installation/)
[mysql](https://www.mysql.com/)

## Adding a shared vulnerability
Once you have added shared functionality to
[`@contrast/test-bench-utils`](https://github.com/Contrast-Security-OSS/test-bench-utils)
and
[`@contrast/test-bench-content`](https://github.com/Contrast-Security-OSS/test-bench-content),
you are ready to add an endpoint in the test bench application.

Create a _routes/ruleName/index.js_ file and call the `controllerFactory` method:
```js
const controllerFactory = require('../../utils/controllerFactory');
exports.name = 'hapitestbench.ruleName';
exports.register = controllerFactory('ruleName');
```

Check the documentation for `controllerFactory` under _utils/controllerFactory.js_
usage information.

Add a _views/pages/ruleName.ejs_ file that includes the shared template from
`@contrast/test-bench-content`:
```html
<% include ../../../node_modules/@contrast/test-bench-content/views/ruleName.ejs %>
```

Add a handler for the rule in _index.js_:
```js
const { routes: { ..., ruleName } } = require('@contrast/test-bench-utils');
...
{
  plugin: './routes/ruleName',
  routes: { prefix: ruleName.base }
},
...
```

Now run the app and make sure everything works as expected!
