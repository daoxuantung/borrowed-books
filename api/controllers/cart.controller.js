var Book = require('../../models/book.model');

module.exports.index = async (req, res) => {
  res.json(req.session.Carts);
};

module.exports.addToCart = async (req, res) => {
  var book = await Book.findOne({_id: req.params.id});
  var carts = req.session.Carts || [];
  var count = 0;
  var cart = {
    id: req.params.id,
    bookTitle: book.title,
    coverUrl: book.coverUrl,
    amount: 1
  };

  if (!carts.length) {
    carts.push(cart);
    req.session.Carts = carts;
    req.session.Count = countItems(count, carts);
    res.json(req.session.Carts );
    return;
  }

  var index = containsObject(cart, carts);

  if (index === false) {
    carts.push(cart);
  } else {
    carts[index].amount += 1;
  }

  req.session.Count = countItems(count, carts);
  req.session.Carts = carts;
  res.json(req.session.Carts);
};

module.exports.deleteItem = async (req, res) => {
  var book = await Book.findOne({_id: req.params.id});
  var count = 0;

  if (req.session.Carts) {
    var index = containsObject(book, req.session.Carts);

    req.session.Carts.splice(index, 1);
    req.session.Count = countItems(count, req.session.Carts);
    res.json( req.session.Carts);
  }
};

function containsObject(cart, carts) {
  for (var i = 0; i < carts.length; i++) {
      if (carts[i].id === cart.id) {
          return i;
      }
  }

  return false;
}

function countItems(count, carts) {
  for (var cart of carts) {
    count += cart.amount;
  }

  return count;
}

