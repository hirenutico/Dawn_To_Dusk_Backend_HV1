const expressJwt = require('express-jwt');
const config = require('../config.json');
module.exports = jwt;
function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            '/api/user/register',
            '/api/user/varifyOtp',
            '/api/user/login',
            '/api/user/updateUser',
            '/api/user/GetSingleUser',
            '/api/user/GetAllUser',
            '/api/user/DeleteSingleUser',
            '/api/user/DeleteAllUser',
            '/api/category/addcategory',
            '/api/category/getcategory',
            '/api/category/deletecategory',
            '/api/category/deleteallcategory',
            '/api/menu/addproduct',
            '/api/menu/getproduct',
            '/api/address/addaddress',
            '/api/address/getaddress',
            '/api/address/getalladdress',
            '/api/address/deleteaddress',
            '/api/address/deletealladdress',
            new RegExp('/resources.*/', 'i')           
        ]
    });
}