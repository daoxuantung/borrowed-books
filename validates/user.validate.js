var User = require('../models/user.model');

module.exports.signup = (req, res, next) => {
  var errors = [];
  
  if (!req.body.name) {
    errors.push('Name isn\'t required');
  }
  if (!req.body.email) {
    errors.push('Email isn\'t required');
  }
  
  if (!req.body.phone) {
    errors.push('Phone isn\'t required');
  }

  if (!req.body.password) {
    errors.push('Password isn\'t required');
  }


  if (errors.length) {
    res.render('signup', {
      errors: errors,
      values: req.body
    })
    return;
  }

  next();
};

module.exports.login = async function(req, res, next) {
  var user = await User.findOne({email: req.body.email});
  
  var errors = [];
  
  if (!user) {
    errors.push('User doesn\'t exist');
  }

  if (!req.body.password) {
    errors.push('Password isn\'t required');
  }
  
  if (errors.length) {
    res.render('login', {
      errors: errors
    })
    return;
  }

  res.locals.userLogin = user;
  next();
};


