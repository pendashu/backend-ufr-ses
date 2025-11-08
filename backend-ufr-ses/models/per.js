const mongoose = require('mongoose');

const perSchema = new mongoose.Schema({
  demandeur: String,
  service: String,
  objet: String,
  montant: Number,
  date: String,
  statut: String
});

// ✅ Exporte le modèle Mongoose
module.exports = mongoose.model('Per', perSchema);