const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
    pricePerNight: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    amenities: [String],
    rooms: [{
        type: { type: String, required: true },
        capacity: { type: Number, required: true },
        features: [String],
        images: [String]
    }],
    surroundings: [{
        name: { type: String, required: true },
        description: { type: String, required: true },
        distance: { type: String, required: true },
        images: [String]
    }]
});

module.exports = mongoose.model('Hotel', hotelSchema);
