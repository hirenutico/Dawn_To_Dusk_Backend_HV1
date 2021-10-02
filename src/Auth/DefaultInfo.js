const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const db = require("../../_helper/db");
const dbUser = db.User;
const dbAdd = db.Address;

const GetDefaultAddressInfoFromDB = async (userParams) => {
    const addinfo = await dbAdd.find({ mobile: userParams.mobile, isDefault: true});
    if (addinfo.length === 1) {
        return addinfo
    }
    else {
        return null
    }
}

module.exports = {
    GetDefaultAddressInfoFromDB,
};