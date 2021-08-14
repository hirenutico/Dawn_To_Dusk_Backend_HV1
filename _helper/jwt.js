const expressJwt = require('express-jwt');
const config = require('../config.json');
module.exports = jwt;
function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/register',
            '/api/user/authenticate',
            '/api/user/varifyOtp',
            '/api/user/login',
            new RegExp('/resources.*/', 'i')           
        ]
    });
}