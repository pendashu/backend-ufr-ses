const express = require('express');
const router = express.Router();
const Budget = require('../models/depenses');
const Per = require('../models/per');
const Stock = require('../models/stock');
const Carburant = require('../models/carburant');

// GET /api/dashboard - Résumé global
router.get('/', async (req, res) => {
  try {
    const [depenses, pers, stocks, pleins] = await Promise.all([
      Budget.find(),
      Per.find(),
      Stock.find(),
      Carburant.find()
    ]);

    // Calculs rapides
    const totalBudget = depenses.reduce((sum, d) => sum + d.montant, 0);
    const perEnAttente = pers.filter(p => p.statut === 'en attente').length;
    const stocksCritiques = stocks.filter(s => s.stock <= s.seuil).length;
    const consommationMoyenne = pleins.length > 0 
      ? pleins.reduce((sum, p) => sum + p.quantite, 0) / pleins.length 
      : 0;

    res.json({
      resume: {
        totalBudget,
        perEnAttente,
        stocksCritiques,
        consommationMoyenne: Math.round(consommationMoyenne * 100) / 100
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;