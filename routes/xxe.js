'use strict';
const libxmljs = require('libxmljs');

const ATTACK_XML = `
<!DOCTYPE read-fs [<!ELEMENT read-fs ANY >
<!ENTITY passwd SYSTEM "file:///etc/passwd" >]>
<users>
  <user>
    <read-fs>&passwd;</read-fs>
    <name>C.K Frode</name>
  </user>
</users>`;

module.exports = ({ router }) => {
  router.get('/xxe', (ctx, next) => {
    return ctx.render('xxe', { ATTACK_XML });
  });

  router.post(['/xxe/safe', '/xxe/unsafe'], (ctx, next) => {
    let options;

    if (/\/safe$/.test(ctx.url)) {
      options = {
        noent: false
      };
    } else {
      options = {
        noent: true
      };
    }


    const parsedXML = libxmljs.parseXmlString(ATTACK_XML, options);
    ctx.body = parsedXML.toString();
  });
};

