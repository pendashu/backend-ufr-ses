const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');

// GET /api/stocks - Lire tous les stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/stocks - Ajouter ou mettre à jour un article en stock
router.post('/', async (req, res) => {
  const { nom, unite, stock, seuil } = req.body;

  try {
    // Cherche si l'article existe déjà
    let item = await Stock.findOne({ nom });

    if (item) {
      // Met à jour
      item.stock = stock;
      item.seuil = seuil;
      await item.save();
      res.json(item);
    } else {
      // Crée un nouveau
      const newItem = new Stock({ nom, unite, stock, seuil });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;