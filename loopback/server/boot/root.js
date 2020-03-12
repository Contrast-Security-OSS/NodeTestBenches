// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {
  const router = server.loopback.Router();

  router.get('/', (req, res) => {
    res.render('pages/index');
  });

  server.use(router);
};
