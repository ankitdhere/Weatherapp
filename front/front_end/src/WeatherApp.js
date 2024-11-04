import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

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
        <div className="container">
            <h1 className="header">Weather App</h1>
            <form onSubmit={handleSearch} className="input-group">
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
                <div className="weather-info">
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

