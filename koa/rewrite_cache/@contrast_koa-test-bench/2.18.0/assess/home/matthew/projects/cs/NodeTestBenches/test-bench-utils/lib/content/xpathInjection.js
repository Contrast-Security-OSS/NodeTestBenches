var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    module.exports.xml = ContrastMethods.__contrastTag`
<?xml version="1.0"?>
<users>
  <user>
    <username>admin</username>
    <password>admin</password>
  </user>
  <user>
    <username>user1</username>
    <password>123456</password>
  </user>
  <user>
    <username>tony</username>
    <password>ynot</password>
  </user>
</users>
`;

}.apply(this, arguments));