const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },

    productImages: [{
        // data: Buffer,
        // contentType: String
    }]
});

module.exports = mongoose.model('Product', productSchema);
