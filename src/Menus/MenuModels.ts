const mongooses = require('mongoose');
const Schema2 = mongooses.Schema;

const product_schema = new Schema2({
    foodname: {type: String, unique: false, required: false},
    categoryname: {type: String},
    subcategoryname: {type: String},
    vegnonveg: {type: String},
    foodquantity: {type: Number},
    price: {type: Number},
    desc: {type: String},
});

product_schema.set('toJSON', { virtuals: true });

module.exports = mongooses.model('tbl_product', product_schema);