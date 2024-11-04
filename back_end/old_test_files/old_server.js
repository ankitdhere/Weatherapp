// Import required modules
const axios = require('./lib/axios.js');
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Route to fetch weather data based on city
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.API_KEY;

    try {
        // Call the OpenWeatherMap API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });

        // Send weather data as a JSON response
        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed
        });
    } catch (error) {
        // Handle errors from the API or city not found
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
