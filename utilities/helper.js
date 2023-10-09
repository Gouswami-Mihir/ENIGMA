
var CryptoJS = require("crypto-js");
exports.passwordDecryptor = async (passwordKeyDecrypt) => {
    try {
        var decLayer1 = CryptoJS.TripleDES.decrypt(passwordKeyDecrypt, process.env.PASSWORD_ENCRYPITION_SECRET);
        var deciphertext1 = decLayer1.toString(CryptoJS.enc.Utf8);
        var decLayer2 = CryptoJS.DES.decrypt(deciphertext1, process.env.PASSWORD_ENCRYPITION_SECRET);
        var deciphertext2 = decLayer2.toString(CryptoJS.enc.Utf8);
        var decLayer3 = CryptoJS.AES.decrypt(deciphertext2, process.env.PASSWORD_ENCRYPITION_SECRET);
        var finalDecPassword = decLayer3.toString(CryptoJS.enc.Utf8);
        return finalDecPassword;
        
    } catch(err){
        throw err;
    }
};
exports.passwordEncryptor = async (passwordKeyEncrypt) => {
    try{
        var encLayer1 = CryptoJS.AES.encrypt(passwordKeyEncrypt, process.env.PASSWORD_ENCRYPITION_SECRET).toString();
        var encLayer2 = CryptoJS.DES.encrypt(encLayer1, process.env.PASSWORD_ENCRYPITION_SECRET).toString();
        var finalEncPassword = CryptoJS.TripleDES.encrypt(encLayer2, process.env.PASSWORD_ENCRYPITION_SECRET).toString();
        return finalEncPassword;
    } catch(err){
        throw err;
    }
};


