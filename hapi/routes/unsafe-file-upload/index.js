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
      path: '/submit',
      options: {
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        }
      },
      handler: (request, h) => {
        const payload = request.payload;

        if (payload.file) {
          const name = payload.file.hapi.filename;
          const filePath = path.join(__dirname, '../../uploads', name);
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
    }},
  ]);
};
