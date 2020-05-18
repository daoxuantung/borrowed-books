var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads' });
var app = express();

var controller = require('../controllers/profile.controller');

app.use(express.static('public'));

var router = express.Router();

router.get("/", controller.index);

router.get("/edit", controller.getEdit);

router.post("/edit", controller.postEdit);

router.get("/avatar", controller.getAvatar);

router.post("/avatar", upload.single('avatarUrl'), controller.postAvatar);

router.post("/logout", controller.postLogout);

module.exports = router;