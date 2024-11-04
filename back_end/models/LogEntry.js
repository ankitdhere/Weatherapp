const mongoose = require('mongoose');

const logEntrySchema = new mongoose.Schema({
  message: { type: String, required: true },
  level: { type: String, enum: ['info', 'warning', 'error'], default: 'info' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LogEntry', logEntrySchema);
