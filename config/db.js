const mysql = require('mysql');

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'nodedb',
});

// Établir la connexion
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.message);
    process.exit(1); // Arrêter l'application en cas d'erreur critique
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
