const express = require('express');
const router = express.Router();
const FavoriteCity = require('../models/FavoriteCity');

// Add a favorite city
router.post('/add', async (req, res) => {
  try {
    const { city } = req.body;
    const favorite = new FavoriteCity({ city });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all favorite cities
router.get('/', async (req, res) => {
  try {
    const favorites = await FavoriteCity.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
