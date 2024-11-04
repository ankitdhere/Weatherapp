const express = require('express');
const router = express.Router();
const LogEntry = require('../models/LogEntry');

// Add a log entry
router.post('/log', async (req, res) => {
  try {
    const { message, level } = req.body;
    const log = new LogEntry({ message, level });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await LogEntry.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
