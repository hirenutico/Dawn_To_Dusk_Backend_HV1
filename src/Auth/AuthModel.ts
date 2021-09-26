const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fullname: {type: String,  required: true},
    email: {type: String, unique: true, required: true},
    mobile: {type: String, unique: true, required: true},
    countryCode: {type: String, required: true},
    otp_token: {type: Number},
    verify_otp: {type: Boolean, default: false},
    createddate: {type: Date},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_users', schema);