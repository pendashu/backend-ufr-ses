const express = require('express');
const router = express.Router();
const Passation = require('../models/passation');

// GET /api/passation - Lire tous les plans de passation
router.get('/', async (req, res) => {
  try {
    const passations = await Passation.find();
    res.json(passations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/passation - Ajouter un nouveau plan de passation
router.post('/', async (req, res) => {
  const {
    lot, objet, typeMarche, montantEstime,
    procedurePassation, trimestre, annee, statut
  } = req.body;

  const nouvellePassation = new Passation({
    lot,
    objet,
    typeMarche,
    montantEstime,
    procedurePassation,
    trimestre,
    annee,
    statut: statut || 'En préparation'
  });

  try {
    await nouvellePassation.save();
    res.status(201).json(nouvellePassation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;