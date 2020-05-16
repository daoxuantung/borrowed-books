var User = require('../../models/user.model');
var Book = require('../../models/book.model');

module.exports = async function(req, res) {
  var q = req.query.q;
  var books = await Book.find();
  if (q) {
    var matchedBooks = books.filter(function(book) {
      return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.json(matchedBooks);
    return;
  }

  
  res.json(books);
};