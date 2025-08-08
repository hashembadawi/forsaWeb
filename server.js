const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Serve ad.html for both /ad/:id and /api/ads/getAdById/:id (for frontend page, not API)
app.get(['/ad/:id', '/api/ads/getAdById/:id'], (req, res, next) => {
    // If the request is for the API (Accept: application/json), skip to next (API handler)
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return next();
    }
    res.sendFile(path.join(__dirname, 'public', 'ad.html'));
});

// API endpoint to fetch ad data - proxy to external API
app.get('/api/ads/getAdById/:id', async (req, res) => {
    try {
        const adId = req.params.id;
        const response = await axios.get(`https://sahbo-app-api.onrender.com/api/ads/getAdById/${adId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching ad data:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch ad data',
            message: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
