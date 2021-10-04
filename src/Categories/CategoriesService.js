const config = require('../../config.json');
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbCat = db.Category;
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData }= require('../../_helper/comman')

const addcategory = async (userParams) => {
  var data = await new dbCat(userParams).save();
  if (data) {
    return setResData(true, 200, null , "Category added successfully");
  } else {
    return false;
  }
};

const getcategory = async (userParams) => {
  const data = await dbCat.find({ });
  if (data.length >= 1) {
    return setResData(true, 200, data , "Get all Category.");
  } else {
    return setResData(false, 401, null , "email is not registerd yet!")
  }
};

const deletecategory = async (userParams) => {
  const data = await dbCat.findByIdAndDelete({"_id": userParams.id})
  console.log(data)
  if (data.length >= 1) {
    return setResData(true, 200, null , "Selected Category deleted successfully.");
  }
  else {
    return setResData(false, 401, null , "No address found yet!")
  }
};

const deleteallcategory = async (userParams) => {
  const data = await dbCat.deleteMany({ })
  if (data.length >= 1) {
    return setResData(true, 200, null , "All user info deleted successfully from DB");
  } 
  else {
    return setResData(false, 401, null , "No user Registered yet!")
  }
};

module.exports = {
  addcategory,
  getcategory,
  deletecategory,
  deleteallcategory,
};
