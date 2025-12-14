const mongoose = require('mongoose');

const carburantSchema = new mongoose.Schema({
  date: String,
  vehicule: String,
  conducteur: String,
  kilometrage: Number,
  quantite: Number,
  cout: Number
});

module.exports = mongoose.model('Carburant', carburantSchema);