const express = require('express');
const router = express.Router();
const Per = require('../models/Per');

// GET /api/per
router.get('/', async (req, res) => {
  try {
    const pers = await Per.find();
    res.json(pers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/per
router.post('/', async (req, res) => {
  try {
    const nouveauPER = new Per(req.body);
    await nouveauPER.save();
    res.status(201).json(nouveauPER);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;