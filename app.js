const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

// Initialisation de l'application
const app = express();

// Middleware pour analyser les données JSON et les données des formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration des sessions
app.use(
    session({
        secret: 'votre_secret', // Remplacez par une clé secrète forte
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Utilisez `secure: true` en production avec HTTPS
    })
);

// Middleware pour gérer les connexions à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL.');
    }
});

// Configuration des routes
app.use('/auth', authRoutes); // Routes pour l'authentification
app.use('/users', userRoutes); // Routes pour la gestion des utilisateurs

// Route de base (par défaut)
app.get('/', (req, res) => {
    res.send('Bienvenue dans l\'API de gestion des utilisateurs.');
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send('Page non trouvée.');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
ss