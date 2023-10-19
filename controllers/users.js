var express = require('express');
var router = express.Router();
let mongoConnection = require('../utilities/connections');
let constants = require('../utilities/constants');
let responseManager = require('../utilities/responseManager');
let userModel = require('../models/users.model');
const async =require('async');
exports.usersview =  async (req, res)=> {
    console.log('req.session ',req.session);
    if(req.session.userid){
      let primary = mongoConnection.useDb(constants.DEFAULT_DB);
      let userdata = await primary.model(constants.MODELS.users, userModel).findById(req.session.userid).lean();
      console.log('userdata', userdata);
      if(userdata){
        let data = await primary.model(constants.MODELS.users, userModel).find({createby : req.session.userid}).lean();
        res.render('users', {title: 'users',pop:data});
      }else{
        res.redirect("/");
      }
    }else{
      res.redirect("/");
    }
    
  };
  exports.userspost = async (req, res) => {
    // let {search, LImit } = req.body;
    //   let bob = parseInt(LImit);
    //   let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    //   let data = await primary.model(constants.MODELS.users, userModel).aggregate([
    //     { $match : { $or:[
    //       {fullname:{$regex: search, $options:"i"}},
    //       {email:{$regex: search,$options: "i"}},
    //     ]  } },
    //     {$limit:bob},
    //     {$project:{_id:0, email:1,fullname:1, mobile:1}}
    //   ])
    //   res.send(data);
  }
  