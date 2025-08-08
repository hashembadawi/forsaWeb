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

// API endpoint to fetch ad data
// (No local API handler, frontend fetches from remote API)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
