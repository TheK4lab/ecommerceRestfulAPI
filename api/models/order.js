const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);