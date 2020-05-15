module.exports = async (req, res, next) => {
  if (!req.session.User) {
    res.redirect('/login');
    return;
  }
  var user = req.session.User;
  
  if (!user) {
    res.redirect('/login');
    return;
  }
  
  res.locals.user = user;
  next();
};
