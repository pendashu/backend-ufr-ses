const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://pendashu.github.io",  // ton front GitHub Pages
    "http://localhost:3000"       // pour tests en local
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Importation des routes
const budgetRoutes = require('./routes/budget');
app.use('/api/budget', budgetRoutes);
app.use(express.json());

// Route de test principale
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend UFR SES 🎓');
});

app.use('/api/per', require('./routes/per'));

app.use('/api/stock', require('./routes/stock'));

app.use('/api/carburant', require('./routes/carburant'));

app.use('/api/passation', require('./routes/passation'));

app.use('/api/dashboard', require('./routes/dashboard'));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
