const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  nom: String,
  unite: String, // ex: "ram", "unité"
  stock: Number,
  seuil: Number
});

module.exports = mongoose.model('Stock', stockSchema);