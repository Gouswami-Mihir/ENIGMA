var express = require('express');
var router = express.Router();
let mongoConnection = require('../utilities/connections');
let constants = require('../utilities/constants');
let responseManager = require('../utilities/responseManager');
let userModel = require('../models/users.model');
let helper = require("../utilities/helper");
const async =require('async');
exports.addnewuserview =  async (req, res)=> {
    console.log('req.session ',req.session);
    if(req.session.userid){
      let primary = mongoConnection.useDb(constants.DEFAULT_DB);
      let userdata = await primary.model(constants.MODELS.users, userModel).findById(req.session.userid).lean();
      console.log('userdata', userdata);
      if(userdata){
        res.render('addnewuser', {title: 'addnewuser'});
      }else{
        res.redirect("/");
      }
    }else{
      res.redirect("/");
    }
    
  };
  exports.addnewuserpost = async (req, res) => {
    if(Object.keys(req.body).length > 0){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) && req.body.password && req.body.dob && req.body.password.trim() != ''){
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let checkExisting = await primary.model(constants.MODELS.users, userModel).findOne({email: req.body.email}).lean();
         if(checkExisting == null){
            req.body.password = await helper.passwordEncryptor(req.body.password);
            let newuser = await primary.model(constants.MODELS.users, userModel).create({
                fullname : req.body.fullname,
                email : req.body.email,
                createby : req.session.userid,
                password :  req.body.password,
                dob : req.body.dob,
                gender : req.body.gender,
                mobile : req.body.mobile

            });
            return responseManager.onSuccess('Well done, User added Successfully...',newuser,res);
         }else{
            return responseManager.badrequest({message: "user already exist, please try again with new email"}, res);
         }   
            
        }else{
            return responseManager.badrequest({message: "invalid email and password to add user, please try again "}, res);
    }
    }else{
        return responseManager.badrequest({message: "invalid data to add user "}, res);
    }
  }