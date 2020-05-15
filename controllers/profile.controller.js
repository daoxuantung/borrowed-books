var cloudinary = require('cloudinary').v2;
var User = require('../models/user.model');

module.exports.index = async (req, res) => {
  res.render("profile/index", {
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
};

module.exports.getEdit = async (req, res) => {
  res.render("profile/edit", {
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
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

  res.redirect("/profile");
};

module.exports.getAvatar = async (req, res) => {
  res.render("profile/avatar", {
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
};

module.exports.postAvatar = async (req, res) => {
  var user = await User.findOne({_id: req.session.User._id});

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  var path = 'http://localhost:3000/uploads/' +  req.file.path.slice(15);

  cloudinary.uploader.upload(path, async function(error, result) {
    console.log(result, error);
    // req.body.coverUrl = result.url;

    // await User.update({"_id": user._id}, {"$set":{"avatarUrl": req.body.coverUrl }});

    // res.redirect("/profile");
  });
};