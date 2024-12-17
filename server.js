const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const { createAdmin } = require('./controllers/authController')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const initializeAdmin = async () => {
        await createAdmin();
        console.log('Admin initialization complete');
    };

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/places', placeRoutes);
app.use('/hotels', hotelRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    initializeAdmin();
});
