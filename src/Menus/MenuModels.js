const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product_schema = new Schema({
    foodname: {type: String, unique: false, required: true},
    categoryname: {type: String, unique: false, required: true},
    subcategoryname: {type: String, unique: false, required: true},
    vegnonveg: {type: String, unique: false, required: true},
    foodquantity: {type: Number, unique: false, required: true},
    price: {type: Number, unique: false, required: true},
    desc: {type: String, unique: false, required: true},
});

product_schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_product', product_schema);