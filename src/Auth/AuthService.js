const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.User;
const SMSGateway = require("../../_helper/SMSGateway");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData, RandomString }= require('../../_helper/comman');
const Default_Address = require('./DefaultInfo');
var rn = require("random-number");
var Co_date = new Date();

const userLogin = async (userParams) => {
  const user = await dbUser.find({ mobile: userParams.mobile});
  if (user.length === 1) {
    var gen = rn.generator({
      min: 111111,
      max: 999999,
      integer: true,
    });
    const random = gen();

    var OTP_message =`Use D2D User verification code is `+random.toString() + 'for the Dawn To Dusk authentication.';
    var phoneNo = userParams.countryCode + userParams.mobile
    let sendResult = SMSGateway.Send_SMSCountry_gateway(phoneNo, random, OTP_message)
  
    if (sendResult) {
      const findupdate = await dbUser.findByIdAndUpdate({
        '_id': user[0].id
      }, {$set: {
        "verify_otp": false, 
        "otp_token": random.toString(),
        "modified_date": Co_date,
      }})

      return setResData(true, 200, {"otp": random.toString()} , "D2D Send the OTP on your Register Mobile no. Pleas check it and use it for verification. -2");
    } else {
      return false;
    }
  } else {
    return setResData(false, 401, null , "The Mobile no is not registerd yet!")
  }
};

const userRegister = async (userParams) => {
  var gen = rn.generator({
    min: 111111,
    max: 999999,
    integer: true,
  });
  const random = gen();

  const user = await dbUser.find({mobile: userParams.mobile});
  if (user.length === 1) {
    const encryptedString = cryptr.encrypt(user[0].id)
    let token = jwt.sign({ id:encryptedString}, config.secret, { expiresIn: '1 day' });
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': user[0].id
    }, {$set: {
      "verify_otp": false, 
      "fullname": userParams.fullname, 
      "otp_token": random.toString(), 
      "created_date": Co_date,
      "modified_date": Co_date,
    }})

    if(findupdate) {
      var OTP_message =`Use D2D User verification code is `+ random.toString() + 'for the Dawn To Dusk authentication.';
      var phoneNo = userParams.countryCode + userParams.mobile
      let sendResult = SMSGateway.Send_SMSCountry_gateway(phoneNo, random, OTP_message)
      if (sendResult) {
        var data = await new dbUser(findupdate).save();
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
    
    userParams.otp_token = random.toString()
    userParams.modified_date = Co_date
    userParams.created_date = Co_date
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
  if(userData){
    const encryptedString = cryptr.encrypt(userData[0].id)
    let token = jwt.sign({ id:encryptedString}, config.secret, { expiresIn: '1 day' });
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': userData[0].id
    }, {$set: {
      "verify_otp": true, 
      "accessToken": token, 
      "refreshToken": RandomString(100).toString(), 
      "idToken": RandomString(50).toString(),
      "modified_date": Co_date,
      "default_address": await Default_Address.GetDefaultAddressInfoFromDB(userParams)
    }})
    if(findupdate) {
      findupdate.default_address = await Default_Address.GetDefaultAddressInfoFromDB(userParams)
      console.log('userData', findupdate)
      return setResData(true, 200, findupdate, "verify OTP");
    } 
    else {
      return setResData(false, 400, null , "something right wrong!");
    }
  }
  else{
    return setResData(false, 400, null , "something right wrong!");
 }
}

const updateUser = async(userParams) => {
  const user = await dbUser.find({mobile: userParams.mobile});
  if (user.length === 1) {
    const findupdate = await dbUser.findByIdAndUpdate({
      '_id': user[0].id
    }, {$set: {
      "fullname": userParams.fullname, 
      "email": userParams.email,
      "modified_date": Co_date
    }})
    if (findupdate.length === 1) {
      return setResData(true, 200, findupdate , "User profile updated successfully");
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
  const user = await dbUser.find({ });
  if (user.length >= 1) {
    return setResData(true, 200, user , "Find the following user info from DB");
  } 
  else {
    return setResData(false, 401, null , "No user Registered yet!")
  }
}

const DeleteSingleUser = async(userParams) => {
  const user = await dbUser.deleteOne({  mobile: userParams.mobile })
  if (user.length === 1) {
    return setResData(true, 200, null , "User profile deleted successfully");
  } 
  else {
    return setResData(false, 401, null , "The Mobile no is not registerd yet!")
  }
}

const DeleteAllUser = async(userParams) => {
  const user = await dbUser.deleteMany({ })
  if (user.length >= 1) {
    return setResData(true, 200, null , "All user info deleted successfully from DB");
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
  DeleteSingleUser,
  DeleteAllUser,
};
