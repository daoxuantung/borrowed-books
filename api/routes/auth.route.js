var express = require('express');

var controller = require('../controllers/auth.controller');
var validate = require('../../validates/user.validate');

var router = express.Router();

router.post("/login", validate.login, controller.postLogin);

module.exports = router;