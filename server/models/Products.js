const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String, // Assuming you store the image URL
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    hasWifi: {
        type: Boolean,
        default: false
    },
    hasMusholla: {
        type: Boolean,
        default: false
    },
    hasSoundSystem: {
        type: Boolean,
        default: false
    },
    hasAC: {
        type: Boolean,
        default: false
    }
});

const ProductModel = mongoose.model('products', productSchema);
module.exports = ProductModel;
