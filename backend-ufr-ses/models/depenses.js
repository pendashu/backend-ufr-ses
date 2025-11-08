const mongoose = require('mongoose');

const depenseSchema = new mongoose.Schema({
  motif: String,
  montant: Number,
  date: String
});

module.exports = mongoose.model('Depense', depenseSchema);