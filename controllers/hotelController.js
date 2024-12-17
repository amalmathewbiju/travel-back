const Hotel = require('../models/Hotels');

exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate('placeId');
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
};

exports.createHotel = async (req, res) => {
    try {
        const hotelData = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            placeId: req.body.placeId,
            pricePerNight: Number(req.body.pricePerNight),
            availability: req.body.availability,
            amenities: req.body.amenities,
            rooms: req.body.rooms,
            surroundings: req.body.surroundings
        };
        const newHotel = new Hotel(hotelData);
        const savedHotel = await newHotel.save();
        const populatedHotel = await Hotel.findById(savedHotel._id).populate('placeId');
        
        res.status(201).json(populatedHotel);
    } catch (error) {
        console.log('Hotel creation error:', error);
        res.status(400).json({ 
            message: 'Error creating hotel', 
            error: error.message,
            details: error.errors 
        });
    }
};


exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('placeId');
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotel', error });
    }
};

exports.updateHotel = async (req, res) => {
    try {
        const hotelData = {
            ...req.body,
            amenities: req.body.amenities.split(',').map(item => item.trim()),
            rooms: req.body.rooms.map(room => ({
                ...room,
                features: room.features.split(',').map(f => f.trim())
            }))
        };
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            hotelData,
            { new: true, runValidators: true }
        ).populate('placeId');

        res.json(updatedHotel);
    } catch (error) {
        res.status(400).json({ message: 'Error updating hotel', error: error.message });
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hotel', error });
    }
};

exports.getHotelsByPlaceId = async (req, res) => {
    try {
        const { placeId } = req.params;
        const hotels = await Hotel.find({ placeId }).populate('placeId');
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
};
