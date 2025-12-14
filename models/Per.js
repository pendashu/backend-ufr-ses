const mongoose = require('mongoose');

const perSchema = new mongoose.Schema({
  demandeur: String,
  service: String,
  objet: String,
  montant: Number,
  date: String,
  statut: { type: String, default: "en attente" }
});

module.exports = mongoose.model('Per', perSchema);