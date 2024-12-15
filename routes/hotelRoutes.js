const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.getAllHotels);
router.post('/', hotelController.createHotel);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);
router.get('/places/:placeId', hotelController.getHotelsByPlaceId);

module.exports = router;
