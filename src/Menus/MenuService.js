const config = require('../../config.json');
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.Menu;
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData }= require('../../_helper/comman')

const addproduct = async (userParams) => {
  console.log(`Server listening on port ${userParams}`);
  var data = await new dbUser(userParams).save();
  if (data) {
    return setResData(true, 200, {"data": userParams} , "product added");
  } else {
    return false;
  }
};

const getproduct = async (userParams) => {
  const data = await dbUser.find({ });
  if (data.length === 1) {
    
  } else {
    return setResData(false, 401, null , "email is not registerd yet!")
  }
};

module.exports = {
    addproduct
};
