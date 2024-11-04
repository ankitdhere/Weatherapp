const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');

// Save a search entry
router.post('/add', async (req, res) => {
  try {
    const { city } = req.body;
    const search = new SearchHistory({ city });
    await search.save();
    res.status(201).json(search);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all search history
router.get('/', async (req, res) => {
  try {
    const history = await SearchHistory.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
