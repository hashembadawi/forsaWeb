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

// Serve ad.html for direct ad ID routes (like /:id)
app.get('/:id', (req, res, next) => {
    const adId = req.params.id;
    
    // Skip if it's an API request
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return next();
    }
    
    // Skip if it's a static file request (has file extension)
    if (adId.includes('.')) {
        return next();
    }
    
    // Skip if it's the API path
    if (adId === 'api') {
        return next();
    }
    
    // Serve ad.html for valid ad IDs (MongoDB ObjectId format - 24 hex characters)
    if (/^[a-f\d]{24}$/i.test(adId)) {
        res.sendFile(path.join(__dirname, 'public', 'ad.html'));
    } else {
        next(); // Let other routes handle invalid IDs
    }
});

// Legacy route support (optional - for backward compatibility)
app.get('/ad/:id', (req, res) => {
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
