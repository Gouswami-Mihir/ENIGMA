const mongoConnection = require('../utilities/connections');
const constants = require('../utilities/constants');
const responseManager = require('../utilities/responseManager');
const helper = require('../utilities/helper');
var userModel = require('../models/users.model');
exports.loginview = function(req, res, next) {
    res.render('login', { title: 'Express' }); 
}
exports.loginpost = async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) && req.body.password && req.body.password.trim() != '') {
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let checkExisting = await primary.model(constants.MODELS.users, userModel).findOne({ email: req.body.email }).lean();
            if (checkExisting != null) {
                let decPassword = await helper.passwordDecryptor(checkExisting.password);
                if (decPassword == req.body.password) {
                    req.session.userid = checkExisting._id.toString();
                    return responseManager.onSuccess('login successfully', 1, res);
                } else {
                    return responseManager.badrequest({ message: "Invalid password, Please try again with valid password..." }, res);
                }
            } else {
                return responseManager.badrequest({ message: "Email id not existed, Please try again with new email..." }, res);
            }
        } else {
            return responseManager.badrequest({ message: "Invalid email and password to logged in user, Please try again" }, res);
        }
    } else {
        return responseManager.badrequest({ message: "Invalid data to logged in user, Please try again" }, res);
    }
};
