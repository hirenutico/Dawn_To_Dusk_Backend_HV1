const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    categoryname: {type: String, unique: false, required: true},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_main_category', schema);