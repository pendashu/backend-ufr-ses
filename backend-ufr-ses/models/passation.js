const mongoose = require('mongoose');

const passationSchema = new mongoose.Schema({
  lot: String,
  objet: String,
  typeMarche: { 
    type: String,
    enum: ['Travaux', 'Fournitures', 'Services', 'Études']
  },
  montantEstime: Number,
  procedurePassation: {
    type: String,
    enum: ['Appel d\'offres ouvert', 'Appel d\'offres restreint', 'Procédure négociée']
  },
  trimestre: {
    type: String,
    enum: ['T1', 'T2', 'T3', 'T4']
  },
  annee: Number,
  statut: {
    type: String,
    enum: ['En préparation', 'Lancé', 'Clôturé'],
    default: 'En préparation'
  },
  dateMiseAJour: { 
    type: String, 
    default: () => new Date().toISOString().split('T')[0] 
  }
});

module.exports = mongoose.model('Passation', passationSchema);