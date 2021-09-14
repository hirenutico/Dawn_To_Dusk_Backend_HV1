const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.User;
const mail = require("../../_helper/email");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData }= require('../../_helper/comman')
var rn = require("random-number");

const userLogin = async (userParams) => {
  // const user = await dbUser.find({ email: userParams.email , mobile: userParams.mobile});
  const user = await dbUser.find({ mobile: userParams.mobile});
  if (user.length === 1) {
    var gen = rn.generator({
      min: 111111,
      max: 999999,
      integer: true,
    });
    const random = gen();
    var html =`otp is `+random.toString();
    let sendResult = mail.sendDynamicMail(userParams.email, "test", html);
    userParams.otp_token = random
    if (sendResult) {
      
      const findupdate = await dbUser.findByIdAndUpdate({
        '_id': user[0].id
      }, {$set: {"verify_otp":false, "otp_token": random.toString()}})

      return setResData(true, 200, {"otp": random.toString()} , "we otp send your register email address");
        // return setResData(true, 200, data , "we otp send your register email address");
    } else {
      return false;
    }
  } else {
    return setResData(false, 401, null , "email is not registerd yet!")
  }
};

async function authenticate(userParams) {
  if(!userParams.otp){
    return setResData(false,400, null , "Otp required")
  }
  const user = await dbUser.find({ email: userParams.email });
  if(user){
    delete user[0].id
    if(!user[0].verify_otp){
      return setResData(false,400, null , "email is not verify")
    }
    if(user[0].otp_token === userParams.otp){
      const encryptedString = cryptr.encrypt(user[0].id)
      let token = jwt.sign({ id:encryptedString}, config.secret, { expiresIn: '1 day' });
     const data  = {
        user:user[0],
        accessToken:token,
        api_key: config.api_key
      }
      return setResData(false,200, data , "login success.")
    }else{
      return setResData(false,400, null , "invalid otp!")
    }
  } 
}
const userRegister = async (userParams) => {
  const user = await dbUser.find({ email: userParams.email , mobile: userParams.mobile});

  var gen = rn.generator({
    min: 111111,
    max: 999999,
    integer: true,
  });
  const random = gen();

  if (user.length === 1) {
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': user[0].id
    }, {$set: {"verify_otp":false, "fullname": userParams.fullname, "otp_token": random.toString()}})
    if(findupdate){
      var html =`otp is `+random.toString();
      let sendResult = mail.sendDynamicMail(userParams.email, "test", html);
      userParams.otp_token = random
      if (sendResult) {
        return setResData(true, 200, {"otp": random.toString()} , "we otp send your register email address");
          // return setResData(true, 200, data , "we otp send your register email address");
      } else {
        return false;
      }
    }
    // return setResData(false,400, null , "email is already register!")
  } else {
      var html =`otp is `+random.toString();
      let sendResult = mail.sendDynamicMail(userParams.email, "test", html);
      userParams.otp_token = random
      if (sendResult) {
        var data = await new dbUser(userParams).save();
        if (data) {
          return setResData(true, 200, {"otp": random.toString()} , "we otp send your register email address");
          // return setResData(true, 200, data , "we otp send your register email address");
        } else {
          return false;
        }
      } else {
        return false;
      }
  }
};
const VerifyOTP =async(userParams)=>{
  const userData = await dbUser.find({ otp_token : userParams.code });
  console.log('userData', userData)
  if(userData){
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': userData[0].id
    }, {$set: {"verify_otp":true}})
    if(findupdate){
      const newuserData = await dbUser.find({ otp_token : userParams.code });
      const encryptedString = cryptr.encrypt(newuserData[0].id)
      let token = jwt.sign({ id:encryptedString}, config.secret, { expiresIn: '1 day' });
      const updateddata  = {
        user:newuserData[0],
        accessToken:token,
        api_key: config.api_key
      }
      return setResData(true,200, updateddata , "verify OTP");
    }else{
        return setResData(false,400, '' , "something right wrong!");
     }
  }
}
module.exports = {
  authenticate,
  userRegister,
  VerifyOTP ,
  userLogin
};
