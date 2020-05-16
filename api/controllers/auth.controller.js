var User = require('../../models/user.model');

module.exports.postLogin = (req, res) => {
  var user = res.locals.userLogin;
  res.json(user);
};  