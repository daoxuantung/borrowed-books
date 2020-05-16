var express = require('express');

var controller = require('../controllers/auth.controller');
var validate = require('../../validates/user.validate');

var router = express.Router();

router.get("/login", controller.getLogin);

router.post("/login", validate.login, controller.postLogin);

router.get("/signup", controller.getSignup);

router.post("/signup", validate.signup, controller.postSignup);

module.exports = router;