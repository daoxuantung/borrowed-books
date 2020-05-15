var User = require('../models/user.model');

module.exports= async function(req, res, next) {
	res.render('index', {
		user: req.session.User,
	    carts: req.session.Carts,
	    count: req.session.Count
	});
};