const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    famousPlaces: [{
        name: String,
        description: String,
        images: [String]
    }],
    culturalAttractions: [{
        name: String,
        description: String,
        images: [String]
    }],
    mustExplore: [{
        name: String,
        description: String,
        images: [String]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
