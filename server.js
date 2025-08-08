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

app.get('/ad/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ad.html'));
});

// API endpoint to fetch ad data
app.get('/api/ads/getAdById/:id', async (req, res) => {
    try {
        const adId = req.params.id;
        // This would typically fetch from your database
        // For now, returning the sample data you provided
        const sampleAd = {
            "location": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "_id": adId,
            "adTitle": "Flower Bouquets",
            "userId": "688f1c7fdf60175a782abafd",
            "userName": "Heba Badawi",
            "userPhone": "905352640462",
            "price": "300",
            "currencyId": 4,
            "currencyName": "L.T",
            "categoryId": 7,
            "categoryName": "Community",
            "subCategoryId": 58,
            "subCategoryName": "Gifts and Toys",
            "cityId": 4,
            "cityName": "Idlib",
            "regionId": 15,
            "regionName": "Ram Hamdan",
            "createDate": "2025-08-05T17:07:05.313Z",
            "description": "Custom Flowers",
            "isApproved": true,
            "__v": 0,
            "images": [
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            ]
        };
        
        res.json(sampleAd);
    } catch (error) {
        console.error('Error fetching ad:', error);
        res.status(500).json({ error: 'Failed to fetch ad data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
