import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSearch = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setWeatherData(null);
            setError('City not found or an error occurred');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{weatherData.city}</h2>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Description: {weatherData.description}</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
