const express = require('express');
const router = express.Router();
const Depense = require('../models/Depense');

// GET /api/budget
router.get('/', async (req, res) => {
  try {
    const depenses = await Depense.find();
    res.json(depenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/budget
router.post('/', async (req, res) => {
  try {
    const nouvelleDepense = new Depense(req.body);
    await nouvelleDepense.save();
    res.status(201).json(nouvelleDepense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;