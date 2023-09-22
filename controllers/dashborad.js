var express = require('express');
var router = express.Router();
let mongoConnection = require('../utilities/connections');
let constants = require('../utilities/constants');
let responseManager = require('../utilities/responseManager');
let userModel = require('../models/users.model');
const async =require('async');
exports.dashboradview =  async (req, res)=> {
    console.log('req.session ',req.session);
    if(req.session.userid){
      let primary = mongoConnection.useDb(constants.DEFAULT_DB);
      let userdata = await primary.model(constants.MODELS.users, userModel).findById(req.session.userid).lean();
      console.log('userdata', userdata);
      if(userdata){
        res.render('dashborad', {title: 'dashborad'});
      }else{
        res.redirect("/");
      }
    }else{
      res.redirect("/");
    }
    
  };
  