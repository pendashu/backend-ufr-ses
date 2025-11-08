const mongoose = require('mongoose');

const carburantSchema = new mongoose.Schema({
  date: String,
  vehicule: String,
  conducteur: String,
  kilometrage: Number,
  quantite: Number, // en litres
  cout: Number // coût en FCFA
});

module.exports = mongoose.model('Carburant', carburantSchema);