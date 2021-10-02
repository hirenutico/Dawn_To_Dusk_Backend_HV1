const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    accessToken: {type: String, unique: true, required: false},
    idToken: {type: String, unique: true, required: false},
    refreshToken: {type: String, unique: true, required: false},
    fullname: {type: String,  required: true},
    email: {type: String, unique: true, required: true},
    mobile: {type: String, unique: true, required: true},
    countryCode: {type: String, required: true},
    otp_token: {type: Number},
    verify_otp: {type: Boolean, default: false},
    created_date: {type: Date, required: true},
    modified_date: {type: Date, required: true},
    default_address: {type: Array},
    default_pay_mode: {type: Array}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_users', schema);