const mongooses = require('mongoose');
const Schema2 = mongooses.Schema;

const product_schema = new Schema2({
    foodname: {type: String, unique: false, required: true},
    categoryname: {type: String, unique: false, required: true},
    subcategoryname: {type: String, unique: false, required: true},
    vegnonveg: {type: String, unique: false, required: true},
    foodquantity: {type: Number, unique: false, required: true},
    price: {type: Number, unique: false, required: true},
    desc: {type: String, unique: false, required: true},
});

product_schema.set('toJSON', { virtuals: true });

module.exports = mongooses.model('tbl_product', product_schema);