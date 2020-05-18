var express = require("express");

var controller = require('../controllers/storage.controller');
var validate = require('../validates/book.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/add', controller.getAdd);

router.post('/add', validate.add, controller.postAdd);

router.get('/edit/:id', controller.getEdit);

router.post('/edit/:id', validate.edit, controller.postEdit);

router.post('/delete/:id', controller.postDelete);

module.exports = router;