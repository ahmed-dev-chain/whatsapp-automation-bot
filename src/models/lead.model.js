const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  electricityUsage: String,
  location: String,
  systemType: String,
  roofType: String,
  phone: String,
  source: String,
});

module.exports = mongoose.model('Lead', leadSchema);
