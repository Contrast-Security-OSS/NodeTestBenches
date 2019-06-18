'use strict';
const fs = require('fs');
const path = require('path');

exports.name = 'hapitestbench.unsafefileupload';


exports.register = function unsafeFileUpload(server, options) {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'unsafe-file-upload'
      },
    },
    {
      method: 'POST',
      path: '/submit-stream',
      options: {
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      // coverage for stream-based multipart form uploads
      handler: (request, h) => {
        const payload = request.payload;

        if (payload.file) {
          const name = payload.file.hapi.filename;
          const filePath = path.resolve(path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            name
          ));
          const file = fs.createWriteStream(filePath);

          file.on('error', (err) => console.error(err));

          payload.file.pipe(file);

          payload.file.on('end', (err) => { 
            const ret = {
              filename: payload.file.hapi.filename,
              headers: payload.file.hapi.headers
            };
            return JSON.stringify(ret);
          });
        }

        return h.response('OK');
      }
    },
    // normal file uploads for sane people
    {
      method: 'POST',
      path: '/submit',
      options: {
        payload: {
          output: 'file',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      handler: (request, h) => {
        const payload = request.payload;
        return {
          filename: payload.file.filename,
          headers: payload.file.headers
        };
      }
    }
  ]);
};
