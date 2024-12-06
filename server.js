const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour les administrateurs et les utilisateurs
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
