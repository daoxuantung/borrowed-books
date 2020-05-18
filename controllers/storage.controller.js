var User = require('../models/user.model');
var Book = require('../models/book.model');

module.exports.index = async function(req, res, next) {
  var q = req.query.q;
  var books = await Book.find({auth: req.session.User.name});

  res.render("storage/index", {
    books: books,
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
};

module.exports.getAdd = function(req, res, next) {
  res.render("storage/add", {
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
};

module.exports.postAdd = async function(req, res, next) {
  var book = {
    title: req.body.title,
    description:  req.body.description,
    auth: req.session.User.name,
    coverUrl: 'https://res.cloudinary.com/lepis/image/upload/v1588575401/gy2phfjyfp7l7nijn8bx.jpg'
  }

  await Book.create(book);
  res.redirect('/storage');
};

module.exports.getEdit = async function(req, res, next) {
  var book = await Book.findOne({_id: req.params.id});
  res.render("storage/edit", {
    book: book,
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
};

module.exports.postEdit = async function(req, res, next) {
  var book = await Book.findOne({_id: req.params.id});

  await Book.updateMany({"_id": book._id}, {"$set":{
    "title": req.body.title,
    "description": req.body.description,
    "auth": req.session.User.name,
    "coverUrl": 'https://res.cloudinary.com/lepis/image/upload/v1588575401/gy2phfjyfp7l7nijn8bx.jpg'
  }});

  res.redirect("/storage");
};

module.exports.postDelete = async function(req, res, next) {
  var id = req.params.id;
  
  await Book.findByIdAndRemove(id);

  res.redirect("/storage");
};