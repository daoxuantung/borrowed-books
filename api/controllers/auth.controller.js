var User = require('../../models/user.model');
var bcrypt = require('bcrypt-nodejs');

module.exports.getLogin = (req, res) => {
  res.json();
};

module.exports.getSignup = (req, res) => {
  res.json();
};

module.exports.postLogin = (req, res) => {
  var user = res.locals.userLogin;

  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if (!result) {
      res.json('Wrong password. Try again!');
      return;
    }
    req.session.User = user;
    res.json(req.session.User);
  });
};  


module.exports.postSignup = (req, res) => {
  bcrypt.hash(req.body.password, null, null, async function(err, hash) {
    var user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
      avatarUrl: 'https://cdn.glitch.com/c746a29f-8c69-4bea-bbca-c84221fde348%2Ficonfinder_profle_1055000.png?v=1588408036354',
      isAdmin: false
    }

    await User.create(user);
  });

  res.json(user);
};  