var User = require('../models/user.model');
var Book = require('../models/book.model');

module.exports = async function(req, res) {
  var q = req.query.q;
  var books = await Book.find();
  if (q) {
    var matchedBooks = books.filter(function(book) {
      return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render("books/index", {
      books: matchedBooks,
      user: req.session.User,
      carts: req.session.Carts,
      count: req.session.Count
    });
    return;
  }

  
  res.render("books/index", {
    books: books,
    user: req.session.User,
    carts: req.session.Carts,
    count: req.session.Count
  });
};