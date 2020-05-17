var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function(err) {
	if(err) {
		throw Error(err);
	}

	console.log('Collect Successfully!');
});

var indexRouter = require('./routes/index.route');
var bookRouter = require('./routes/book.route');
var authRouter = require('./routes/auth.route');
var transactionRouter = require('./routes/transaction.route');
var profileRouter = require('./routes/profile.route');
var cartRouter = require('./routes/cart.route');
var apiTransactionRouter = require('./api/routes/transaction.route');
var apiAuthRouter = require('./api/routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use(session({
  secret: 'sessionsecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 60000}
}));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/', authRouter);
app.use('/transactions', authMiddleware, transactionRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/carts', cartRouter);
app.use('/api/transactions', apiTransactionRouter);
app.use('/api', apiAuthRouter);

app.use(function(req, res, next){
  res.status(404);

  if (req.accepts('html')) {
    res.render('errors/404');
    return;
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
