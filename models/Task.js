const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
