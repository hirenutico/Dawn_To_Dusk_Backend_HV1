const config = require('../../config.json');
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.Address;
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData }= require('../../_helper/comman')

const addaddress = async (userParams) => {
  var data = await new dbUser(userParams).save();
  if (data) {
    const add_data = await dbUser.find({ mobile: userParams.mobile });
    return setResData(true, 200, add_data , "Users address update");
  } else {
    return setResData(false, 400, null , "No address updated or added");
  }
};

const getaddress = async (userParams) => {
  const data = await dbUser.find({ mobile: userParams.mobile });
  if (data.length >= 1) {
    return setResData(true, 200, data , "Find Users address list");
  } else {
    return setResData(false, 401, null , "No address updated yet!")
  }
};

const getalladdress = async (userParams) => {
  const data = await dbUser.find({ });
  if (data.length >= 1) {
    return setResData(true, 200, data , "Find Users address list");
  } else {
    return setResData(false, 401, null , "No address updated yet!")
  }
};

const deleteaddress = async (userParams) => {
  const demo = await dbUser.deleteOne({ mobile: userParams.mobile })
  if (demo.length == 0) {
    return setResData(true, 200, null , "Selected Address deleted successfully.");
  }
  else {
    return setResData(false, 401, null , "No address found yet!")
  }
};

const deletealladdress = async (userParams) => {
  const demo = await dbUser.deleteMany({ })
  if (demo.length == 0) {
    return setResData(true, 200, null , "All address deleted successfully.");
  }
  else {
    return setResData(false, 401, null , "No address found yet!")
  }
};

module.exports = {
  addaddress,
  getaddress,
  getalladdress,
  deleteaddress,
  deletealladdress,
};
