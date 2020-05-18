var Book = require('../models/book.model');


module.exports.add = (req, res, next) => {
  var errors = [];
  
  if (!req.body.title) {
    errors.push('Title isn\'t required');
  }
  if (!req.body.description) {
    errors.push('Description isn\'t required');
  }

  if (errors.length) {
    res.render('storage/add', {
      errors: errors,
      values: req.body
    })
    return;
  }

  next();
};

module.exports.edit = async (req, res, next) => {
  var errors = [];
  var book = await Book.findOne({_id: req.params.id});

  if (!req.body.title) {
    errors.push('Title isn\'t required');
  }
  if (!req.body.description) {
    errors.push('Description isn\'t required');
  }

  if (errors.length) {
    res.render('storage/edit', {
      book: book,
      errors: errors,
      values: req.body
    })
    return;
  }

  next();
};

