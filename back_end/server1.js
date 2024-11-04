
console.log("API Key:", process.env.API_KEY);
console.log("Environment Variables:", process.env);
// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const connectDB = require('./db');
const searchHistoryRoutes = require('./routes/searchHistory');
const favoriteCityRoutes = require('./routes/favoriteCity');
const logEntryRoutes = require('./routes/logEntry');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api/searchHistory', searchHistoryRoutes);
app.use('/api/favorites', favoriteCityRoutes);
app.use('/api/logs', logEntryRoutes);

// Enable CORS for all requests
// Enable CORS for all requests
app.use(cors());

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
        // Log the error details to the console
        console.error('Error fetching weather data:', error.message);
        
        // Log additional details if the error response exists
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }

        // Respond with a 500 status and an error message
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
