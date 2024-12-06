const mysql = require('mysql');

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',  // Hôte de la base de données
    user: 'root',       // Utilisateur MySQL
    password: '',       // Mot de passe de l'utilisateur MySQL
    database: 'nodedb'  // Nom de la base de données
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données.');
    }
});

module.exports = db;
