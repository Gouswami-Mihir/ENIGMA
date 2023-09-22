var express = require('express');
var router = express.Router();
let mongoConnection = require('../utilities/connections');
let constants = require('../utilities/constants');
let responseManager = require('../utilities/responseManager');
let userModel = require('../models/users.model');
const async =require('async');
let dashboradctrl = require('../controllers/dashborad');
/* GET users listing. */
router.get('/', dashboradctrl.dashboradview)
module.exports = router;
