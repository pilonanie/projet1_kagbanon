const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',      // Adresse de votre serveur MySQL
    user: 'root',           // Nom d'utilisateur MySQL
    password: '',           // Mot de passe MySQL (laissez vide si aucun mot de passe)
    database: 'nodedb'      // Nom de la base de données
});

// Établir la connexion
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.message);
        process.exit(1); // Arrêter l'application si la connexion échoue
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

module.exports = db;
