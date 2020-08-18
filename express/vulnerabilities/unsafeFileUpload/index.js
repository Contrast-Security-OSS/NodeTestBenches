'use strict';

const express = require('express');
const { get } = require('lodash');
const path = require('path');
const multer = require('multer');

const { utils } = require('@contrast/test-bench-utils');

const router = express.Router();
const dest = path.resolve(__dirname, 'uploads');
const upload = multer({ dest });
const sinkData = utils.getSinkData('unsafeFileUpload', 'express');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

router.get('/', function(req, res) {
  res.render(path.resolve(__dirname, 'views', 'index'), {
    ...routeMeta,
    sinkData
  });
});

sinkData.forEach(({ method, params, uri, sink, key }) => {
  router[method](uri, upload.single('file'), async (req, res) => {
    const inputs = utils.getInput(req, key, params);
    const result = await sink(inputs); // doesn't really do anything
    res.send(result);
  });
});

module.exports = router;
