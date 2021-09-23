const expressJwt = require('express-jwt');
const config = require('../config.json');
module.exports = jwt;
function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            '/api/user/register',
            '/api/user/authenticate',
            '/api/user/varifyOtp',
            '/api/user/login',
            '/api/menu/addproduct',
            new RegExp('/resources.*/', 'i')           
        ]
    });
}