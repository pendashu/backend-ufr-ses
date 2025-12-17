const express = require('express');
const router = express.Router();
const Depense = require('../models/Depense');
const Per = require('../models/Per');
const Stock = require('../models/Stock');
const Carburant = require('../models/Carburant');
const Passation = require('../models/Passation');

// GET /api/dashboard — Résumé global
router.get('/', async (req, res) => {
  try {
    const totalBudget = 1000000; // À remplacer par une vraie valeur depuis MongoDB
    const depenses = await Depense.find();
    const totalDepenses = depenses.reduce((acc, d) => acc + d.montant, 0);
    const solde = totalBudget - totalDepenses;

    const pers = await Per.find();
    const perEnAttente = pers.filter(p => p.statut === "en attente").length;

    const stocks = await Stock.find();
    const stocksCritiques = stocks.filter(s => s.stock <= s.seuil).length;

    const pleins = await Carburant.find();
    const consommationMoyenne = pleins.length > 0 ? pleins.reduce((acc, p) => acc + p.quantite, 0) / pleins.length : 0;

    res.json({
      resume: {
        totalBudget,
        totalDepenses,
        solde,
        perEnAttente,
        stocksCritiques,
        consommationMoyenne
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;