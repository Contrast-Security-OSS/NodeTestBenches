# HapiTestBench
screener app for Hapi 17

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
[`@contrast/test-bench-utils`](https://github.com/Contrast-Security-OSS/NodeTestBenches/tree/master/test-bench-utils),
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
<% include ../../../node_modules/@contrast/test-bench-utils/public/views/ruleName.ejs %>
```

Now run the app and make sure everything works as expected!
