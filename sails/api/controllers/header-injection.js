module.exports = function(req, res) {
  const path = req.query.user_path;
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', 0);
  res.set('INJECTED', path);

  res.send(`Injected header  ${path}`);
};
