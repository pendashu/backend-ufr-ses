const express = require('express');
const router = express.Router();

// ✅ Importe le modèle avec une majuscule
const Per = require('../models/per');

// GET /api/per - Lire tous les PER
router.get('/', async (req, res) => {
  try {
    const pers = await Per.find(); // ✅ Bon
    res.json(pers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/per - Ajouter un nouveau PER
router.post('/', async (req, res) => {
  const { demandeur, service, objet, montant, date, statut } = req.body;

  // ✅ Création d'une instance du modèle
  const nouveauPer = new Per({
    demandeur,
    service,
    objet,
    montant,
    date,
    statut: statut || 'en attente'
  });

  try {
    // ✅ Sauvegarde
    await nouveauPer.save();
    res.status(201).json(nouveauPer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;