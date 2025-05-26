const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Goal', goalSchema);
