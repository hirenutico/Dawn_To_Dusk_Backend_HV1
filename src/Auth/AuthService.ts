const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.User;
const SMSGateway = require("../../_helper/SMSGateway");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData, RandomString }= require('../../_helper/comman')
var rn = require("random-number");

const userLogin = async (userParams) => {
  const user = await dbUser.find({ mobile: userParams.mobile});
  if (user.length === 1) {
    var gen = rn.generator({
      min: 111111,
      max: 999999,
      integer: true,
    });
    const random = gen();
    userParams.otp_token = random
    userParams.accessToken = RandomString(100).toString()
    userParams.refreshToken = RandomString(100).toString()
    userParams.idToken = RandomString(50).toString()

    var OTP_message =`Use D2D User verification code is `+random.toString() + 'for the Dawn To Dusk authentication.';
    var phoneNo = userParams.countryCode + userParams.mobile
    let sendResult = SMSGateway.Send_SMSCountry_gateway(phoneNo, random, OTP_message)
  
    if (sendResult) {
      
      const findupdate = await dbUser.findByIdAndUpdate({
        '_id': user[0].id
      }, {$set: {"verify_otp":false, "otp_token": random.toString()}})

      return setResData(true, 200, {"otp": random.toString()} , "D2D Send the OTP on your Register Mobile no. Pleas check it and use it for verification. -2");
    } else {
      return false;
    }
  } else {
    return setResData(false, 401, null , "The Mobile no is not registerd yet!")
  }
};

const userRegister = async (userParams) => {
  const user = await dbUser.find({mobile: userParams.mobile});

  var gen = rn.generator({
    min: 111111,
    max: 999999,
    integer: true,
  });
  const random = gen();

  if (user.length === 1) {
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': user[0].id
    }, {$set: {"verify_otp":false, "fullname": userParams.fullname, "otp_token": random.toString(), "accessToken": RandomString(100).toString(), "refreshToken": RandomString(100).toString(), "idToken": RandomString(50).toString()}})

    if(findupdate) {
      var OTP_message =`Use D2D User verification code is `+random.toString() + 'for the Dawn To Dusk authentication.';
      var phoneNo = userParams.countryCode + userParams.mobile
      let sendResult = SMSGateway.Send_SMSCountry_gateway(phoneNo, random, OTP_message)

      userParams.otp_token = random

      if (sendResult) {
        return setResData(true, 200, {"otp": random.toString()} , "D2D Send the OTP on your Register Mobile no. Pleas check it and use it for verification. -1");
      } 
      else {
        return false;
      }
    }
    else {
      return setResData(false, 401, null , "The Mobile no is not registerd yet!")
    }
  } 
  else {
    var OTP_message =`Use D2D User verification code is `+random.toString() + 'for the Dawn To Dusk authentication.';
    var phoneNo = userParams.countryCode + userParams.mobile
    let sendResult = SMSGateway.Send_SMSCountry_gateway(phoneNo, random, OTP_message)
    
      userParams.otp_token = random
      userParams.accessToken = RandomString(100).toString()
      userParams.refreshToken = RandomString(100).toString()
      userParams.idToken = RandomString(50).toString()
      if (sendResult) {
        var data = await new dbUser(userParams).save();
        if (data) {
          return setResData(true, 200, {"otp": random.toString()} , "D2D Send the OTP on your Register Mobile no. Pleas check it and use it for verification. -3");
        } 
        else {
          return false;
        }
      } 
      else {
        return false;
      }
  }
};

const VerifyOTP = async(userParams) => {
  const userData = await dbUser.find({ otp_token : userParams.code, mobile: userParams.mobile});
  console.log('userData', userData)
  if(userData){
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': userData[0].id
    }, {$set: {"verify_otp":true, "accessToken": RandomString(100).toString(), "refreshToken": RandomString(100).toString(), "idToken": RandomString(50).toString()}})
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

const updateUser = async(userParams) => {
  const user = await dbUser.find({mobile: userParams.mobile});
  if (user.length === 1) {
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': user[0].id
    }, {$set: {"fullname": userParams.fullname, "email": userParams.email}})
    const user2 = await dbUser.find({mobile: userParams.mobile});
    if (user2.length === 1) {
      return setResData(true, 200, user2 , "User profile updated successfully");
    }
    else {
      return setResData(false, 401, null , "User profile updated failed due to some issue. Please try again!")
    }
  } 
  else {
    return setResData(false, 401, null , "The Mobile no is not registerd yet!")
  }
}

const GetSingleUser = async(userParams) => {
  const user = await dbUser.find({mobile: userParams.mobile});
  if (user.length === 1) {
    return setResData(true, 200, user , "User profile getted successfully");
  } 
  else {
    return setResData(false, 401, null , "The Mobile no is not registerd yet!")
  }
}

const GetAllUser = async(userParams) => {
  const user = await dbUser.find( {} );
  if (user.length >= 1) {
    return setResData(true, 200, user , "Find the following user info from DB");
  } 
  else {
    return setResData(false, 401, null , "No user Registered yet!")
  }
}

module.exports = {
  userRegister,
  VerifyOTP,
  userLogin,
  updateUser,
  GetSingleUser,
  GetAllUser,
};
