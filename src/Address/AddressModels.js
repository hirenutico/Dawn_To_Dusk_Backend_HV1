const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    address: {type: String, unique: true, required: true},
    location: {type: String, unique: true, required: true},
    lat: {type: String, unique: true, required: true},
    long: {type: String, unique: true, required: true},
    isDefault: {type: Boolean, unique: false, required: false},
    mobile: {type: String, unique: false, required: true},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_address', schema);