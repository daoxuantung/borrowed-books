var User = require('../models/user.model');
var Book = require('../models/book.model');
var Transaction = require('../models/transaction.model');

module.exports.index = async (req, res) => { 
	var transactions =  await Transaction.find({user: req.session.User.name});
	res.render('transactions/index', {
		user: req.session.User,
		transactions: transactions,
	    carts: req.session.Carts,
	    count: req.session.Count 
	});
};  

module.exports.createTransaction = async (req, res) => {
  var items = req.session.Carts;
  var transactions = [];

  for (var item of items) {
    var transaction = {
      user: req.session.User.name,
      book: item.bookTitle,
      isComplete: false
    }
    transactions.push(transaction);
  }
  await Transaction.insertMany(transactions);
  req.session.Carts = [];
  req.session.Count = 0;
  res.redirect('/transactions');
};