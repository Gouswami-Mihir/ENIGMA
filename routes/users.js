var express = require('express');
var router = express.Router();

/* GET users listing. */

var usersctrl = require('../controllers/users')
// GET home page.
router.get('/',usersctrl.usersview);
router.post('/',usersctrl.userspost);

// router.post('/', signupctrl.signuppost);

module.exports = router;
