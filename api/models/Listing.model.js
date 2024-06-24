const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Regularprice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    offer: {
        type: Boolean,
        required: true
    },
    imageUrl: {
        type: Array,
        required: true
    },
    useRefs: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

const ListingModel = mongoose.model('Listing', listingSchema);

module.exports = ListingModel;
