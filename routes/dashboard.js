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
    // Récupérer les données
    const depenses = await Depense.find();
    const pers = await Per.find();
    const stocks = await Stock.find();
    const pleins = await Carburant.find();
    const lots = await Passation.find();

    // Calculs
    const totalBudget = 1500000; // À remplacer par une vraie valeur si besoin
    const totalDepenses = depenses.reduce((acc, d) => acc + d.montant, 0);
    const solde = totalBudget - totalDepenses;
    const perEnAttente = pers.filter(p => p.statut === 'en attente').length;
    const stocksCritiques = stocks.filter(s => s.stock <= s.seuil).length;
    const consommationMoyenne = pleins.length > 0 ? pleins.reduce((sum, p) => sum + p.quantite, 0) / pleins.length : 0;

    // Répondre
    res.json({
      resume: {
        totalBudget,
        totalDepenses,
        solde,
        perEnAttente,
        stocksCritiques,
        consommationMoyenne: parseFloat(consommationMoyenne.toFixed(2))
      }
    });
  } catch (err) {
    console.error("Erreur dashboard :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "✅ Dashboard OK", status: 200 });
});

module.exports = router; // ✅ OBLIGATOIRE — sans ça, Express ignore le fichier