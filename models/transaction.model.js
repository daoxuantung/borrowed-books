var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
	user: String,
	book: String,
  isComplete: Boolean
});

var Transaciton = mongoose.model('Transaciton', transactionSchema, 'transactions');

module.exports = Transaciton;