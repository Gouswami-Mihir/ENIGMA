var express = require('express');
var router = express.Router();
var loginctrl = require('../controllers/logincontroller')
// GET home page.
router.get('/',loginctrl.loginview);
router.post('/',loginctrl.loginpost);
module.exports = router;
