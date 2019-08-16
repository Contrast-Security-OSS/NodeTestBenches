'use strict';
const Hoek = require('@hapi/hoek');
const fs = require('fs');
const path = require('path');

const { utils } = require('@contrast/test-bench-utils');

const uploadDir = path.resolve(__dirname, 'uploads');
const sinkData = utils.getSinkData('unsafeFileUpload', 'hapi');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

// write our own custom sink to work with the generated view.
sinkData.push({
  ...sinkData[0],
  name: 'uploadStream',
  uri: `${sinkData[0].uri}Stream`,
  url: `${sinkData[0].url}Stream`,
  urlWithoutParams: `${sinkData[0].urlWithoutParams}Stream`
});

function formatResponse({ filename, headers }, input) {
  const json = JSON.stringify(
    {
      filename,
      headers,
      input
    },
    null,
    2
  );

  return `<pre>${json}</pre>`;
}

function uploadFile(fileStream) {
  const name = fileStream.hapi.filename;
  const filePath = path.join(uploadDir, name);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileStream._data, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

exports.name = 'hapitestbench.unsafefileupload';

exports.register = function unsafeFileUpload(server, options) {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        view: {
          template: 'unsafeFileUpload',
          context: {
            ...routeMeta,
            sinkData
          }
        }
      }
    },
    // normal file uploads for sane people
    {
      method: sinkData[0].method,
      path: sinkData[0].uri,
      options: {
        payload: {
          uploads: uploadDir,
          output: 'file',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      handler: async (request, h) => {
        const { key } = sinkData[0];
        const file = Hoek.reach(request, `${key}.file`) || {};
        const input = Hoek.reach(request, `${key}.input`) || '';
        return formatResponse(file, input);
      }
    },
    // stream uploads
    {
      method: sinkData[1].method,
      path: sinkData[1].uri,
      options: {
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      // coverage for stream-based multipart form uploads
      handler: async (request, h) => {
        const { key } = sinkData[1];
        const fileStream = Hoek.reach(request, `${key}.file`);
        const input = Hoek.reach(request, `${key}.input`) || '';

        if (fileStream.hapi.filename) {
          await uploadFile(fileStream);
          return formatResponse(fileStream.hapi, input);
        }

        // no file upload just returning text field
        return formatResponse(fileStream.hapi, input);
      }
    }
  ]);
};
