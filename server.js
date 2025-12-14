const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Routes
app.use('/api/budget', require('./routes/budget'));
app.use('/api/per', require('./routes/per'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/carburant', require('./routes/carburant'));
app.use('/api/passation', require('./routes/passation'));

// Route de test
app.get('/', (req, res) => {
  res.send("Backend UFR SES en ligne 🎓");
});

// Démarrage
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));