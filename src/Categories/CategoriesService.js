const config = require('../../config.json');
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.Category;
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const { setResData }= require('../../_helper/comman')

const addcategory = async (userParams) => {
  var data = await new dbUser(userParams).save();
  if (data) {
    return setResData(true, 200, null , "Category added successfully");
  } else {
    return false;
  }
};

const getcategory = async (userParams) => {
  const data = await dbUser.find({ });
  if (data.length === 1) {
    return setResData(true, 200, data , "Get all Category.");
  } else {
    return setResData(false, 401, null , "email is not registerd yet!")
  }
};

const deletecategory = async (userParams) => {
  const demo = await dbUser.deleteOne({ id: userParams.id })
  if (demo.length == 0) {
    return setResData(true, 200, null , "Selected Category deleted successfully.");
  }
  else {
    return setResData(false, 401, null , "No address found yet!")
  }
};

const deleteallcategory = async (userParams) => {
  const demo = await dbUser.deleteMany({ })
  if (demo.length == 0) {
    return setResData(true, 200, null , "All category deleted successfully.");
  }
  else {
    return setResData(false, 401, null , "No address found yet!")
  }
};

module.exports = {
  addcategory,
  getcategory,
  deletecategory,
  deleteallcategory,
};
