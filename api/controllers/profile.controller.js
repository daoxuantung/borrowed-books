var cloudinary = require('cloudinary').v2;
var User = require('../models/user.model');

module.exports.index = async (req, res) => {
  res.json(req.session.User,req.session.Carts);
};

module.exports.getEdit = async (req, res) => {
  res.json(req.session.User,req.session.Carts);
};

module.exports.postEdit = async (req, res) => {
  var user = req.session.User;

  user.name = req.body.name;
  user.phone = req.body.phone;
  user.email = req.body.email;


  await User.updateMany({"_id": user._id}, {"$set":{
    "name": req.body.name,
    "phone": req.body.phone,
    "email": req.body.email
  }});

  var updateUser = await User.findOne({"_id": user._id});

  res.json(updateUser);
};

module.exports.getAvatar = async (req, res) => {
  res.json(req.session.User,req.session.Carts);
};
