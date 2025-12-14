const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  nom: String,
  unite: String,
  stock: Number,
  seuil: Number,
  dateMiseAJour: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

module.exports = mongoose.model('Stock', stockSchema);