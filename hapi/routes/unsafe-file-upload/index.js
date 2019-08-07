'use strict';
const Hoek = require('@hapi/hoek');
const fs = require('fs');
const path = require('path');
const {
  routes: {
    unsafe_file_upload: { base: baseUri }
  },
  frameworkMapping: { hapi }
} = require('@contrast/test-bench-utils');
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

function formatResponse({ filename, headers }, input) {
  return JSON.stringify({
    filename,
    headers,
    input
  });
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
  const { method, key } = hapi.body;
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('unsafe-file-upload', { uri: baseUri })
    },
    {
      method,
      path: '/submit-stream',
      options: {
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      // coverage for stream-based multipart form uploads
      handler: async (request, h) => {
        const fileStream = Hoek.reach(request, `${key}.file_stream`);

        if (fileStream.hapi.filename) {
          await uploadFile(fileStream);
          return formatResponse(fileStream.hapi, request[key].input_stream);
        }

        // no file upload just returning text field
        return formatResponse(fileStream.hapi, request[key].input_stream);
      }
    },
    // normal file uploads for sane people
    {
      method,
      path: '/submit',
      options: {
        payload: {
          uploads: uploadDir,
          output: 'file',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      handler: (request, h) => {
        const file = Hoek.reach(request, `${key}.file`) || {};
        return formatResponse(file, request[key].input);
      }
    }
  ]);
};
