const Place = require('../models/Place');

exports.getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching places', error });
    }
};

exports.createPlace = async (req, res) => {
    try {
        const placeData = {
            ...req.body,
            famousPlaces: req.body.famousPlaces.filter(place => 
                place.name && place.description && place.images.length > 0
            ),
            culturalAttractions: req.body.culturalAttractions.filter(attr => 
                attr.name && attr.description && attr.images.length > 0
            ),
            mustExplore: req.body.mustExplore.filter(item => 
                item.name && item.description && item.images.length > 0
            )
        };

        const newPlace = new Place(placeData);
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error adding place', 
            error: error.message 
        });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching place', error });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPlace) return res.status(404).json({ message: 'Place not found' });
        res.json(updatedPlace);
    } catch (error) {
        res.status(400).json({ message: 'Error updating place', error });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json({ message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting place', error });
    }
};
