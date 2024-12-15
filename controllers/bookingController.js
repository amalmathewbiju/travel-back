let bookings = []; // In-memory storage for bookings

exports.createBooking = (req, res) => {
    const booking = { id: Date.now().toString(), ...req.body };
    bookings.push(booking);
    res.status(201).json(booking);
};

exports.getBookings = (req, res) => {
    res.json(bookings);
};
