const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
