const express = require('express');
const router = express.Router();
const Carburant = require('../models/carburant');

// GET /api/carburant - Lire tous les pleins
router.get('/', async (req, res) => {
  try {
    const pleins = await Carburant.find();
    res.json(pleins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/carburant - Ajouter un nouveau plein
router.post('/', async (req, res) => {
  const { date, vehicule, conducteur, kilometrage, quantite, cout } = req.body;

  const nouveauPlein = new Carburant({
    date,
    vehicule,
    conducteur,
    kilometrage,
    quantite,
    cout
  });

  try {
    await nouveauPlein.save();
    res.status(201).json(nouveauPlein);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;