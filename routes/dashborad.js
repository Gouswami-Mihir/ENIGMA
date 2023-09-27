var express = require('express');
var router = express.Router();
const async =require('async');
let dashboradctrl = require('../controllers/dashborad');
/* GET users listing. */
router.get('/', dashboradctrl.dashboradview)
module.exports = router;
