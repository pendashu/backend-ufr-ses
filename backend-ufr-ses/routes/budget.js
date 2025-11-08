const express = require("express");
const router = express.Router();
const Depense = require("../models/depenses"); // ← assure le "s"

// GET toutes les dépenses
router.get("/", async (req, res) => {
  try {
    const depenses = await Depense.find();
    res.json(depenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST une dépense
router.post("/", async (req, res) => {
  const depense = new Depense(req.body);
  try {
    const nouvelleDepense = await depense.save();
    res.status(201).json(nouvelleDepense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
