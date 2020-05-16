var express = require("express");

var controller = require('../controllers/cart.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/add/:id', controller.addToCart);

router.get('/delete/:id', controller.deleteItem);

module.exports = router;