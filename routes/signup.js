var express = require('express');
var router = express.Router();
var signupctrl = require('../controllers/signupcontroller')
// GET home page.
router.get('/',signupctrl.signupview);
router.post('/', signupctrl.signuppost);
module.exports = router;
