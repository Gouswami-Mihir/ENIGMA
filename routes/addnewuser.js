var express = require('express');
var router = express.Router();
const async =require('async');
let addnewuserctrl = require('../controllers/addnewuser');
/* GET users listing. */
router.get('/', addnewuserctrl.addnewuserview)
router.post('/',addnewuserctrl.addnewuserpost)
module.exports = router;
