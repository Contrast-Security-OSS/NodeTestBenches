# LoopbackTestBench
Intentionally Vulnerable Loopback Application

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed or install a version of node from [nvm](https://github.com/creationix/nvm).

```sh
git clone https://github.com/Contrast-Security-OSS/LoopbackTestBench.git # or clone your own fork
cd LoopbackTestBench
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Running with Contrast

### Installation
See [our documentation](https://docs.contrastsecurity.com/installation-nodeinstall.html) for installation instructions.

### Running the agent
After installation, the agent can be run with ```npm run contrast```.
For more information on configuration and which technologies the agent supports, see our [documentation](https://docs.contrastsecurity.com/installation-node.html#node-config).

## Adding a shared vulnerability
Once you have added shared functionality to
[`@contrast/test-bench-utils`](https://github.com/Contrast-Security-OSS/test-bench-utils)
and
[`@contrast/test-bench-content`](https://github.com/Contrast-Security-OSS/test-bench-content),
you are ready to add an endpoint in the test bench application.

Create a _server/boot/ruleName.js_ file and call the `controllerFactory` method:
```js
'use strict';

const controllerFactory = require('../utils/controllerFactory');

module.exports = function(server) {
  const controller = controllerFactory('ruleName', { server });
  server.use('/ruleName', controller);
};
```

Check the documentation for `controllerFactory` under _server/utils/controllerFactory.js_
usage information.

Add a _server/views/pages/ruleName.ejs_ file that includes the shared
template from `@contrast/test-bench-content`:
```html
<% include ../../../node_modules/@contrast/test-bench-content/views/ruleName.ejs %>
```

Now run the app and make sure everything works as expected!
