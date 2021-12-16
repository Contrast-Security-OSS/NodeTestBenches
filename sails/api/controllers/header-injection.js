module.exports = function(req, res) {
  const path = req.query.user_path;
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', 0);

  res.setHeader('INJECTED', path);
  res.send(`Injected header  ${path}`);
};
